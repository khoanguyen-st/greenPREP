import { fetchWritingTestDetails, submitWritingAnswers } from '@features/writing/api'
import { DEFAULT_MAX_WORDS } from '@features/writing/constance'
import FooterNavigator from '@features/writing/ui/writing-footer-navigator'
import QuestionForm from '@features/writing/ui/writing-question-form'
import QuestionNavigatorContainer from '@features/writing/ui/writing-question-navigator-container'
import { useQuery } from '@tanstack/react-query'
import { Typography, Spin, Card, Divider, message } from 'antd'
import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const WritingTest = () => {
  const navigate = useNavigate()
  // @ts-ignore
  // const user = useSelector(state => state.auth.user)
  // const userId = user?.id
  const { data, isLoading, isError } = useQuery({
    queryKey: ['writingQuestions'],
    queryFn: fetchWritingTestDetails
  })

  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('writingAnswers')) || {})
  const [wordCounts, setWordCounts] = useState({})
  const [flaggedParts, setFlaggedParts] = useState(() => JSON.parse(localStorage.getItem('flaggedParts')) || {})

  useEffect(() => {
    if (data?.Parts) {
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
        part.Questions.forEach(question => {
          const fieldName = question.ID
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

  const handleTextChange = (questionId, text) => {
    const newAnswers = { ...answers, [questionId]: text }
    setAnswers(newAnswers)
    localStorage.setItem('writingAnswers', JSON.stringify(newAnswers))
    setWordCounts(prev => ({
      ...prev,
      [questionId]: countWords(text)
    }))
  }

  const handleSubmit = async () => {
    try {
      if (!data?.Parts) {
        return
      }

      const payload = {
        // studentId: userId,
        studentId: '7a5cb071-5ba0-4ecf-a4cf-b1b62e5f9798',
        topicId: 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
        skillName: 'WRITING',
        sessionParticipantId: 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
        questions: []
      }
      data.Parts.forEach(part => {
        part.Questions.forEach(question => {
          payload.questions.push({
            questionId: question.ID,
            answerText: answers[question.ID] ?? '',
            answerAudio: null
          })
        })
      })
      await submitWritingAnswers(payload)
      localStorage.removeItem('writingAnswers')
      localStorage.removeItem('flaggedParts')

      navigate('/complete-test')
    } catch {
      message.error({
        content: 'Cannot submit answers. Please contact technical support.',
        duration: 5
      })
    }
  }

  if (isLoading) {
    return <Spin className="flex h-screen items-center justify-center" />
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>
  }

  if (!data?.Parts?.length) {
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
        <Title level={3} className="text-l mb-5 font-semibold">
          Question {currentPartIndex + 1} of {data.Parts.length}
        </Title>

        <QuestionForm
          currentPart={currentPart}
          partNumber={partNumber}
          answers={answers}
          flaggedParts={flaggedParts}
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
