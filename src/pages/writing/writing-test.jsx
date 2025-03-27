import { fetchWritingTestDetails } from '@features/writing/api/writingAPI'
import { DEFAULT_MAX_WORDS } from '@features/writing/constance/writing-const'
import FooterNavigator from '@features/writing/ui/writing-footer-navigator'
import QuestionForm from '@features/writing/ui/writing-question-form'
import QuestionNavigatorContainer from '@features/writing/ui/writing-question-navigator-container'
import { useQuery } from '@tanstack/react-query'
import { Typography, Spin, Card, Divider } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const WritingTest = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['writingQuestions'],
    queryFn: async () => {
      const response = await fetchWritingTestDetails()
      return { ...response }
    }
  })

  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('writingAnswers')) || {})
  const [wordCounts, setWordCounts] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(
    () => JSON.parse(localStorage.getItem('flaggedQuestions')) || {}
  )

  useEffect(() => {
    if (data) {
      const storedAnswers = JSON.parse(localStorage.getItem('writingAnswers')) || {}
      setAnswers(storedAnswers)
      updateWordCounts(storedAnswers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPartIndex])

  const countWords = text => text.trim().split(/\s+/).filter(Boolean).length

  const updateWordCounts = updatedAnswers => {
    const newWordCounts = {}
    if (data?.Parts) {
      data.Parts.forEach(part => {
        part.Questions.forEach((question, index) => {
          const fieldName = `answer-${part.ID}-${index}`
          newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || '')
        })
      })
    }
    setWordCounts(newWordCounts)
  }

  const handleFlagToggle = questionId => {
    const updatedFlags = {
      ...flaggedQuestions,
      [questionId]: !flaggedQuestions[questionId]
    }
    setFlaggedQuestions(updatedFlags)
    localStorage.setItem('flaggedQuestions', JSON.stringify(updatedFlags))
  }

  const handleTextChange = (field, text) => {
    const newAnswers = { ...answers, [field]: text }
    setAnswers(newAnswers)
    localStorage.setItem('writingAnswers', JSON.stringify(newAnswers))
    setWordCounts(prev => ({
      ...prev,
      [field]: countWords(text)
    }))
  }

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.table(answers)
    localStorage.removeItem('writingAnswers')
    localStorage.removeItem('flaggedQuestions')
    navigate('/complete-test')
  }

  if (isLoading) {
    return <Spin className="flex h-screen items-center justify-center" />
  }
  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>
  }

  if (!data || !data.Parts || data.Parts.length === 0) {
    return <div className="text-center text-gray-500">No test data available</div>
  }

  const currentPart = data.Parts[currentPartIndex]
  const partNumber = parseInt(currentPart.Content.match(/Part (\d+)/)?.[1]) || 0

  return (
    <div className="relative mx-auto min-h-screen max-w-4xl p-5">
      <Divider orientation="left">
        <Typography.Title level={1}>Writing test</Typography.Title>
      </Divider>

      <Card className="mb-32">
        <Title level={3} className="text-l mb-5 font-semibold">
          Question {currentPartIndex + 1} of {data.Parts.length}
        </Title>
        <Text className="mb-3 mt-8 block text-lg font-semibold xs:mx-2 md:mx-0 md:text-xl">{currentPart.Content}</Text>
        <QuestionForm
          currentPart={currentPart}
          partNumber={partNumber}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          handleFlagToggle={handleFlagToggle}
          handleTextChange={handleTextChange}
          countWords={countWords}
          wordCounts={wordCounts}
          DEFAULT_MAX_WORDS={DEFAULT_MAX_WORDS}
        />
      </Card>

      <QuestionNavigatorContainer
        data={data}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        setCurrentPartIndex={setCurrentPartIndex}
        currentPartIndex={currentPartIndex}
        handleSubmit={handleSubmit}
      />
      <FooterNavigator
        totalQuestions={data.Parts.length}
        currentQuestion={currentPartIndex}
        setCurrentQuestion={setCurrentPartIndex}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default WritingTest
