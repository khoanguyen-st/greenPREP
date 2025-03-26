import { useState } from 'react'
import { Spin, Alert, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion'
import PlayStopButton from '@features/listening/ui/PlayStopButton'
import { fetchListeningTestDetails } from '@features/listening/api/listeningAPI'

import TestNavigation from './TestNavigation'

const TestPart2 = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])

  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTestPart2'],
    queryFn: () => fetchListeningTestDetails('matching')
  })

  const getTotalQuestions = () => {
    if (!testData || !testData.Parts) {
      return 0
    }
    return testData.Parts.reduce((acc, part) => acc + part.Questions.length, 0)
  }

  const getCurrentPart = () => testData?.Parts[currentPartIndex] || null
  const getCurrentQuestion = () => {
    const part = getCurrentPart()
    return part?.Questions[currentQuestionIndex] || null
  }

  const getCurrentFlatIndex = () => {
    if (!testData?.Parts) {
      return 0
    }

    let count = 0
    for (let i = 0; i < currentPartIndex; i++) {
      count += testData.Parts[i].Questions.length
    }
    return count + currentQuestionIndex
  }

  const goToNext = () => {
    const currentPart = getCurrentPart()
    if (currentQuestionIndex < currentPart.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentPartIndex < testData.Parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToQuestion = flatIndex => {
    if (!testData?.Parts) {
      return
    }

    let count = 0
    for (let partIdx = 0; partIdx < testData.Parts.length; partIdx++) {
      const partQuestions = testData.Parts[partIdx].Questions.length
      if (count + partQuestions > flatIndex) {
        setCurrentPartIndex(partIdx)
        setCurrentQuestionIndex(flatIndex - count)
        return
      }
      count += partQuestions
    }
  }

  const handleAnswerSubmit = answer => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) {
      return
    }

    setUserAnswers({
      ...userAnswers,
      [currentQuestion.ID]: answer
    })
  }

  const toggleFlag = isFlagged => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) {
      return
    }

    if (isFlagged) {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.ID])
    } else {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== currentQuestion.ID))
    }
  }

  const formatQuestionData = question => {
    if (!question) {
      return null
    }

    try {
      const answerContent =
        typeof question.AnswerContent === 'string' ? JSON.parse(question.AnswerContent) : question.AnswerContent

      if (
        !answerContent.leftItems ||
        !Array.isArray(answerContent.leftItems) ||
        !answerContent.rightItems ||
        !Array.isArray(answerContent.rightItems) ||
        !answerContent.correctAnswers ||
        !Array.isArray(answerContent.correctAnswers)
      ) {
        throw new Error('Invalid question format: missing required fields')
      }

      const leftItems = answerContent.leftItems.map((item, index) => ({
        id: index + 1,
        label: item
      }))

      const rightItems = answerContent.rightItems.map((item, index) => ({
        id: String.fromCharCode(97 + index),
        label: item
      }))

      return {
        leftItems,
        rightItems
      }
    } catch (error) {
      console.error('Error formatting question data:', error)
      return null
    }
  }

  if (isLoading) {
    return <Spin size="large" className="flex min-h-screen items-center justify-center" />
  }

  if (error) {
    return <Alert type="error" message="Failed to load test data" description={error.message} />
  }

  const currentQuestion = getCurrentQuestion()
  const formattedQuestion = formatQuestionData(currentQuestion)
  const flatIndex = getCurrentFlatIndex()
  const totalQuestions = getTotalQuestions()
  const isFlagged = currentQuestion && flaggedQuestions.includes(currentQuestion.ID)

  return (
    <TestNavigation
      testData={testData}
      currentQuestion={currentQuestion}
      flatIndex={flatIndex}
      totalQuestions={totalQuestions}
      isFlagged={isFlagged}
      onFlag={toggleFlag}
      onQuestionChange={goToQuestion}
      onNext={goToNext}
      onSubmit={handleAnswerSubmit}
      userAnswers={userAnswers}
      flaggedQuestions={flaggedQuestions}
      skillName={testData.Parts[0].Questions[0].Skill.Name}
    >
      <PlayStopButton />
      {formattedQuestion && (
        <>
          <Typography.Title level={5}>{currentQuestion.Content}</Typography.Title>
          <MatchingQuestion
            leftItems={formattedQuestion.leftItems}
            rightItems={formattedQuestion.rightItems}
            userAnswer={userAnswers[currentQuestion?.ID] || []}
            setUserAnswer={answer => handleAnswerSubmit(answer)}
            className="mt-6"
          />
        </>
      )}
    </TestNavigation>
  )
}

export default TestPart2
