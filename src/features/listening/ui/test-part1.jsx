import { useState } from 'react'
import { Spin, Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import MultipleChoice from '@shared/ui/questionType/multipleChoice'
import PlayStopButton from '@features/listening/ui/PlayStopButton'
import { fetchListeningTestDetails } from '@features/listening/api/listeningAPI'

import TestNavigation from './TestNavigation'

const TestPart1 = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])

  // Fetch test data using useQuery
  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTestPart1'],
    queryFn: () => fetchListeningTestDetails('multiple-choice')
  })

  // Calculate total questions for navigation
  const getTotalQuestions = () => {
    if (!testData || !testData.Parts) {
      return 0
    }
    return testData.Parts.reduce((acc, part) => acc + part.Questions.length, 0)
  }

  // Get current part and question
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

      // Validate required fields
      if (!answerContent.options || !Array.isArray(answerContent.options) || !answerContent.correctAnswer) {
        throw new Error('Invalid question format: missing required fields')
      }

      const options = answerContent.options.map((option, index) => ({
        key: String.fromCharCode(65 + index),
        value: option
      }))

      return {
        ...question,
        AnswerContent: JSON.stringify([
          {
            title: question.Content,
            options,
            correctAnswer: answerContent.correctAnswer
          }
        ])
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
        <MultipleChoice
          questionData={formattedQuestion}
          userAnswer={userAnswers}
          setUserAnswer={setUserAnswers}
          onSubmit={handleAnswerSubmit}
          className="mt-6"
        />
      )}
    </TestNavigation>
  )
}

export default TestPart1
