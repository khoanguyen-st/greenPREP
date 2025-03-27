import { useState, useEffect } from 'react'
import { Spin, Alert, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import MultipleChoice from '@shared/ui/questionType/multipleChoice'
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion'
import DropdownQuestion from '@shared/ui/questionType/DropdownQuestion'
import PlayStopButton from '@features/listening/ui/PlayStopButton'
import { fetchListeningTestDetails } from '@features/listening/api/listeningAPI'
import NextScreen from '@shared/ui/Submission/NextScreen'
import SubmissionImage from '@assets/images/listening_submit.jpg'

import TestNavigation from './TestNavigation'

const Test = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('listeningTestAnswers')
    return savedAnswers ? JSON.parse(savedAnswers) : {}
  })
  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    const savedFlags = localStorage.getItem('listeningTestFlags')
    return savedFlags ? JSON.parse(savedFlags) : []
  })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    localStorage.setItem('listeningTestAnswers', JSON.stringify(userAnswers))
  }, [userAnswers])

  useEffect(() => {
    localStorage.setItem('listeningTestFlags', JSON.stringify(flaggedQuestions))
  }, [flaggedQuestions])

  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTest'],
    queryFn: () => fetchListeningTestDetails()
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
    if (isAudioPlaying) {
      return
    }

    const currentPart = getCurrentPart()
    if (currentQuestionIndex < currentPart.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentPartIndex < testData.Parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToQuestion = flatIndex => {
    if (isAudioPlaying) {
      return
    }

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

  const handleSubmit = () => {
    localStorage.removeItem('listeningTestAnswers')
    localStorage.removeItem('listeningTestFlags')
    setIsSubmitted(true)
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

      if (answerContent.options && Array.isArray(answerContent.options) && answerContent.correctAnswer) {
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
      } else if (
        answerContent.leftItems &&
        Array.isArray(answerContent.leftItems) &&
        answerContent.rightItems &&
        Array.isArray(answerContent.rightItems) &&
        answerContent.correctAnswers &&
        Array.isArray(answerContent.correctAnswers)
      ) {
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
      } else if (answerContent.type === 'dropdown-list') {
        return question
      }

      throw new Error('Invalid question format: missing required fields')
    } catch (error) {
      console.error('Error formatting question data:', error)
      return null
    }
  }

  if (isSubmitted) {
    return <NextScreen nextPath="/grammar" skillName="Listening" imageSrc={SubmissionImage} />
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
  const questionType = currentQuestion?.Type || null

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
      onSubmit={handleSubmit}
      userAnswers={userAnswers}
      flaggedQuestions={flaggedQuestions}
      skillName={testData.Parts[0].Questions[0].Skill.Name}
    >
      <Typography.Title level={4} className="mb-4">
        {getCurrentPart()?.Content}
      </Typography.Title>
      <PlayStopButton
        audioUrl={currentQuestion?.AudioKeys}
        questionId={currentQuestion?.ID}
        onPlayingChange={setIsAudioPlaying}
      />
      {formattedQuestion && (
        <>
          {questionType === 'matching' && (
            <Typography.Title level={5} className="mb-6">
              {currentQuestion.Content}
            </Typography.Title>
          )}
          {questionType === 'multiple-choice' ? (
            <MultipleChoice
              questionData={formattedQuestion}
              userAnswer={userAnswers}
              setUserAnswer={setUserAnswers}
              onSubmit={handleAnswerSubmit}
              className="mt-6"
            />
          ) : questionType === 'matching' ? (
            <MatchingQuestion
              leftItems={formattedQuestion.leftItems}
              rightItems={formattedQuestion.rightItems}
              userAnswer={userAnswers[currentQuestion?.ID] || []}
              setUserAnswer={answer => {
                if (!answer || answer.length === 0) {
                  const newAnswers = { ...userAnswers }
                  delete newAnswers[currentQuestion?.ID]
                  setUserAnswers(newAnswers)
                } else {
                  handleAnswerSubmit(answer)
                }
              }}
              className="z-0 mt-6"
            />
          ) : questionType === 'dropdown-list' ? (
            <DropdownQuestion
              questionData={currentQuestion}
              userAnswer={userAnswers}
              setUserAnswer={setUserAnswers}
              className="z-0 mt-6"
            />
          ) : null}
        </>
      )}
    </TestNavigation>
  )
}

export default Test
