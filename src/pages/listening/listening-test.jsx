import { SubmissionImage } from '@assets/images'
import { fetchListeningTestDetails } from '@features/listening/api/listeningAPI'
import PlayStopButton from '@features/listening/ui/play-stop-button'
import TestNavigation from '@features/listening/ui/test-navigation'
import DropdownQuestion from '@shared/ui/question-type/dropdown-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import NextScreen from '@shared/ui/submission/next-screen'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Typography } from 'antd'
import { useState, useMemo, useEffect } from 'react'

const STORAGE_KEY = 'listening_test_answers'

const ListeningTest = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(() => {
    // Load saved answers from localStorage on initial render
    const savedAnswers = localStorage.getItem(STORAGE_KEY)
    return savedAnswers ? JSON.parse(savedAnswers) : {}
  })
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Save answers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userAnswers))
  }, [userAnswers])

  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTest'],
    queryFn: () => fetchListeningTestDetails()
  })

  // Group questions by AudioKeys
  const groupedQuestions = useMemo(() => {
    if (!testData?.Parts) {
      return []
    }

    const groups = {}
    testData.Parts.forEach(part => {
      part.Questions.forEach(question => {
        if (!groups[question.AudioKeys]) {
          groups[question.AudioKeys] = {
            audioUrl: question.AudioKeys,
            questions: [],
            partIndex: testData.Parts.indexOf(part)
          }
        }
        groups[question.AudioKeys].questions.push(question)
      })
    })
    return Object.values(groups)
  }, [testData])

  const getTotalQuestions = () => {
    if (!groupedQuestions.length) {
      return 0
    }
    return groupedQuestions.length
  }

  const getCurrentGroup = () => {
    if (!groupedQuestions.length) {
      return null
    }
    return groupedQuestions[currentPartIndex] || null
  }

  const getCurrentQuestion = () => {
    const group = getCurrentGroup()
    if (!group) {
      return null
    }
    return group.questions[currentQuestionIndex] || null
  }

  const getCurrentFlatIndex = () => {
    if (!groupedQuestions.length) {
      return 0
    }
    return currentPartIndex
  }

  const goToNext = () => {
    if (isAudioPlaying) {
      return
    }

    const currentGroup = getCurrentGroup()
    if (!currentGroup) {
      return
    }

    if (currentQuestionIndex < currentGroup.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentPartIndex < groupedQuestions.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToQuestion = flatIndex => {
    if (isAudioPlaying) {
      return
    }

    if (!groupedQuestions.length) {
      return
    }

    setCurrentPartIndex(flatIndex)
    setCurrentQuestionIndex(0)
  }

  const handleAnswerSubmit = (questionId, answer) => {
    setUserAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answer
      }
      // Save to localStorage immediately
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers))
      return newAnswers
    })
  }

  const handleSubmit = () => {
    // Clear saved answers when submitting
    localStorage.removeItem(STORAGE_KEY)
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
        Array.isArray(answerContent.rightItems)
      ) {
        return {
          ...question,
          Type: question.Type === 'matching' ? 'dropdown-list' : question.Type,
          AnswerContent: {
            ...answerContent,
            type: question.Type === 'matching' ? 'dropdown-list' : answerContent.type
          }
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

  // Create a flattened list of questions for the navigator
  const navigatorQuestions = useMemo(() => {
    if (!testData?.Parts) {
      return []
    }

    const questions = []
    groupedQuestions.forEach(group => {
      questions.push({
        partIndex: group.partIndex,
        questionIndex: 0,
        question: group.questions[0]
      })
    })
    return questions
  }, [groupedQuestions, testData?.Parts])

  if (isSubmitted) {
    return <NextScreen nextPath="/grammar" skillName="Listening" imageSrc={SubmissionImage} />
  }

  if (isLoading) {
    return <Spin size="large" className="flex min-h-screen items-center justify-center" />
  }

  if (error) {
    return <Alert type="error" message="Failed to load test data" description={error.message} />
  }

  const currentGroup = getCurrentGroup()
  const flatIndex = getCurrentFlatIndex()
  const totalQuestions = getTotalQuestions()
  const isFlagged = currentGroup?.questions[0] && flaggedQuestions.includes(currentGroup.questions[0].ID)

  return (
    <TestNavigation
      testData={{
        ...testData,
        Parts: navigatorQuestions.map(q => ({
          ...q.question.Part,
          Questions: [q.question]
        }))
      }}
      currentQuestion={currentGroup?.questions[0]}
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
        {currentGroup?.questions[0]?.Part?.Content}
      </Typography.Title>
      {currentGroup && (
        <PlayStopButton
          audioUrl={currentGroup.audioUrl}
          questionId={currentGroup.questions[0]?.ID}
          onPlayingChange={setIsAudioPlaying}
        />
      )}
      {currentGroup?.questions.map(question => {
        const formattedQ = formatQuestionData(question)
        const qType = question.Type
        return (
          <div key={question.ID} className="mt-6">
            {(qType === 'matching' || qType === 'dropdown-list') && (
              <Typography.Title level={5} className="mb-6">
                {question.Content}
              </Typography.Title>
            )}
            {qType === 'multiple-choice' ? (
              <MultipleChoice
                questionData={formattedQ}
                userAnswer={userAnswers}
                setUserAnswer={setUserAnswers}
                onSubmit={answer => handleAnswerSubmit(question.ID, answer)}
                className="mt-6"
              />
            ) : qType === 'matching' || qType === 'dropdown-list' ? (
              <DropdownQuestion
                questionData={formattedQ}
                userAnswer={userAnswers}
                setUserAnswer={setUserAnswers}
                className="z-0 mt-6"
              />
            ) : null}
          </div>
        )
      })}
    </TestNavigation>
  )
}

export default ListeningTest
