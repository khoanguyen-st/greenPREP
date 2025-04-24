import { FlagFilled, FlagOutlined } from '@ant-design/icons'
import { fetchWritingTestDetails } from '@features/writing/api'
import { DEFAULT_MAX_WORDS } from '@features/writing/constance'
import { useSubmitWritingTest } from '@features/writing/hooks'
import FooterNavigator from '@features/writing/ui/writing-footer-navigator'
import QuestionForm from '@features/writing/ui/writing-question-form'
import QuestionNavigatorContainer from '@features/writing/ui/writing-question-navigator-container'
import { useQuery } from '@tanstack/react-query'
import { Typography, Spin, Card, Divider, Button } from 'antd'
import { useState, useEffect, useCallback } from 'react'
const { Title } = Typography

const WritingTest = () => {
  const { submitWritingTest } = useSubmitWritingTest()
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
  const [flaggedParts, setFlaggedParts] = useState(() => JSON.parse(localStorage.getItem('flaggedParts')) || {})

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
        part.Questions.forEach((_, index) => {
          const fieldName = `answer-${part.ID}-${index}`
          newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || '')
        })
      })
    }
    setWordCounts(newWordCounts)
  }

  const handleFlagToggle = partId => {
    setFlaggedParts(prevFlags => {
      const updatedFlags = {
        ...prevFlags,
        [partId]: !prevFlags[partId]
      }
      localStorage.setItem('flaggedParts', JSON.stringify(updatedFlags))
      return updatedFlags
    })
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

  const handleSubmit = useCallback(async () => {
    await submitWritingTest(data)
    localStorage.removeItem('current_skill')
  }, [submitWritingTest, data])

  const handleForceSubmit = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  useEffect(() => {
    window.addEventListener('forceSubmit', handleForceSubmit)
    return () => {
      window.removeEventListener('forceSubmit', handleForceSubmit)
    }
  }, [handleForceSubmit])
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
        <Title level={1}>Writing</Title>
      </Divider>

      <Card className="mb-32">
        <div className="mb-4 flex w-full items-center justify-between">
          <Title level={4} className="text-l mb-5 font-semibold">
            Question {currentPartIndex + 1} of {data.Parts.length}
          </Title>
          <Button
            icon={flaggedParts[currentPart.ID] ? <FlagFilled className="text-red-600" /> : <FlagOutlined />}
            className={`h-10 items-center justify-center gap-2 rounded-md border px-4 transition-colors ${
              flaggedParts[currentPart.ID]
                ? 'border-red-300 bg-red-50 hover:border-red-400'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFlagToggle(currentPart.ID)}
          >
            <span className={`text-base font-normal ${flaggedParts[currentPart.ID] ? 'text-red-600' : ''}`}>Flag</span>
          </Button>
        </div>

        <QuestionForm
          currentPart={currentPart}
          partNumber={partNumber}
          answers={answers}
          handleTextChange={handleTextChange}
          countWords={countWords}
          wordCounts={wordCounts}
          DEFAULT_MAX_WORDS={DEFAULT_MAX_WORDS}
        />
      </Card>

      <QuestionNavigatorContainer
        data={data}
        answers={answers}
        flaggedParts={flaggedParts}
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
