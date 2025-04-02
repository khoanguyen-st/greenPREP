import FooterNavigator from '@features/reading/ui/reading-footer-navigator'
import QuestionNavigatorContainer from '@features/reading/ui/reading-question-navigator'
import axiosInstance from '@shared/config/axios'
import FlagButton from '@shared/ui/flag-button'
import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import OrderingQuestion from '@shared/ui/question-type/ordering-question'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Typography, Card, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { Title, Text } = Typography

const fetchTestData = async topicId => {
  const baseUrl = 'https://greenprep-api.onrender.com/api/topics'
  const url = `${baseUrl}/${topicId}`
  const response = await axiosInstance.get(url, {
    params: { skillName: 'READING' }
  })
  return response.data
}

const getDefaultAnswerByType = type => {
  switch (type) {
    case 'dropdown-list':
      return {}
    case 'ordering':
    case 'matching':
      return []
    default:
      return ''
  }
}

const formatMatchingQuestion = question => ({
  leftItems: question.AnswerContent.leftItems,
  rightItems: question.AnswerContent.rightItems
})

const formatMultipleChoiceQuestion = question => ({
  ...question,
  AnswerContent:
    typeof question.AnswerContent === 'string' ? question.AnswerContent : JSON.stringify(question.AnswerContent)
})

const ReadingTest = ({ topicId = 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc' }) => {
  const navigate = useNavigate()
  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const savedAnswers = localStorage.getItem('readingAnswers')
      return savedAnswers ? JSON.parse(savedAnswers) : {}
    } catch {
      return {}
    }
  })

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('flaggedQuestions'))
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })

  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isFlagged, setIsFlagged] = useState(false)
  const [partFlaggedStates, setPartFlaggedStates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('partFlaggedStates')) || {}
    } catch {
      return {}
    }
  })

  const {
    data: testData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchTestData', topicId],
    queryFn: () => fetchTestData(topicId),
    staleTime: 6000
  })

  useEffect(() => {
    try {
      localStorage.setItem('readingAnswers', JSON.stringify(userAnswers))
    } catch (error) {
      console.error('Error saving answers:', error)
    }
  }, [userAnswers])

  useEffect(() => {
    localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions))
  }, [flaggedQuestions])

  useEffect(() => {
    localStorage.setItem('partFlaggedStates', JSON.stringify(partFlaggedStates))
  }, [partFlaggedStates])

  useEffect(() => {
    if (testData?.Parts?.[currentPartIndex]) {
      setIsFlagged(Boolean(partFlaggedStates[currentPartIndex]))
    } else {
      setIsFlagged(false)
    }
  }, [currentPartIndex, partFlaggedStates, testData])

  const handleAnswerSubmit = answer => {
    if (!testData?.Parts?.[currentPartIndex]?.Questions?.[currentQuestionIndex]) {
      return
    }

    const currentQuestion = testData.Parts[currentPartIndex].Questions[currentQuestionIndex]

    if (typeof answer === 'function') {
      setUserAnswers(prev => {
        const newAnswers = answer(prev)
        return newAnswers
      })
      return
    }

    const formattedAnswer =
      currentQuestion.Type === 'dropdown-list'
        ? answer
        : typeof answer === 'object' && answer !== null
          ? answer
          : getDefaultAnswerByType(currentQuestion.Type)

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.ID]: formattedAnswer
    }))
  }

  const handlePartChange = newPartIndex => {
    const newPartFlagState = partFlaggedStates[newPartIndex] || false
    setIsFlagged(newPartFlagState)
    setCurrentPartIndex(newPartIndex)
    setCurrentQuestionIndex(0)
  }

  const handleFlagToggle = () => {
    const newIsFlagged = !isFlagged
    setIsFlagged(newIsFlagged)

    const currentQuestion = testData.Parts[currentPartIndex].Questions[currentQuestionIndex]

    setFlaggedQuestions(prev => {
      const newFlags = newIsFlagged ? [...prev, currentQuestion.ID] : prev.filter(id => id !== currentQuestion.ID)
      return newFlags
    })

    setPartFlaggedStates(prev => ({
      ...prev,
      [currentPartIndex]: newIsFlagged
    }))
  }

  const handleSubmit = () => {
    localStorage.removeItem('readingAnswers')
    localStorage.removeItem('flaggedQuestions')
    localStorage.removeItem('partFlaggedStates')
    navigate('/writing')
  }

  if (isLoading) {
    return <Spin className="flex min-h-screen items-center justify-center" size="large" />
  }

  if (isError || !testData?.Parts?.length) {
    return (
      <Alert
        className="flex min-h-screen items-center justify-center"
        message="Error"
        description="Failed to load test data. Please try again."
        type="error"
        showIcon
      />
    )
  }

  const currentPart = testData.Parts[currentPartIndex]
  const currentQuestion = currentPart.Questions[currentQuestionIndex]
  const isLastPart = currentPartIndex === testData.Parts.length - 1

  const shouldShowContent = () => {
    if (currentQuestion.Type === 'matching') {
      return true
    }

    if (currentQuestion.Type === 'dropdown-list') {
      const answerContent =
        typeof currentQuestion.AnswerContent === 'string'
          ? JSON.parse(currentQuestion.AnswerContent)
          : currentQuestion.AnswerContent

      if (answerContent.leftItems && answerContent.rightItems) {
        return true
      }

      if (answerContent.options) {
        return false
      }
    }

    return true
  }

  const renderDropdownQuestion = () => {
    const processedData = (() => {
      try {
        const parsedAnswerContent =
          typeof currentQuestion.AnswerContent === 'string'
            ? JSON.parse(currentQuestion.AnswerContent)
            : currentQuestion.AnswerContent

        if (parsedAnswerContent.leftItems && parsedAnswerContent.rightItems) {
          return {
            id: currentQuestion.ID,
            question: currentQuestion.Content,
            leftItems: parsedAnswerContent.leftItems,
            rightItems: parsedAnswerContent.rightItems,
            type: 'right-left'
          }
        }

        if (parsedAnswerContent.options) {
          const options = parsedAnswerContent.options || []
          const answers = {}
          options.forEach(({ key, value }) => {
            answers[key] = value
          })
          return {
            id: currentQuestion.ID,
            question: currentQuestion.Content,
            answers,
            type: 'paragraph'
          }
        }

        return {
          id: currentQuestion.ID,
          question: currentQuestion.Content,
          answers: parsedAnswerContent,
          type: 'unknown'
        }
      } catch (error) {
        console.error('Error parsing question data:', error)
        return null
      }
    })()

    if (!processedData) {
      return <p className="text-center text-gray-600">No question data available.</p>
    }

    const answer = userAnswers[currentQuestion.ID] || {}

    if (processedData.type === 'right-left') {
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="mt-4">
            {processedData.leftItems.map((leftItem, index) => (
              <div key={index} className="mb-4 flex w-full items-center gap-4">
                <div className="min-w-[300px] flex-shrink-0">
                  <span className="text-sm font-medium">{leftItem}</span>
                </div>
                <div className="flex-1">
                  <Select
                    onChange={value => handleAnswerSubmit({ ...answer, [leftItem]: value })}
                    value={answer?.[leftItem] || ''}
                    className="w-full"
                  >
                    {processedData.rightItems.map(rightItem => (
                      <Option key={rightItem} value={rightItem}>
                        {rightItem}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (processedData.type === 'paragraph') {
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="whitespace-pre-wrap text-base text-gray-800">
            {processedData.question.split(/(\d+\.)/).map((part, index) => {
              if (part.match(/^\d+\.$/)) {
                const number = part.replace('.', '')
                return (
                  <React.Fragment key={index}>
                    {part}
                    <Select
                      onChange={value => handleAnswerSubmit({ ...answer, [number]: value })}
                      value={answer?.[number] || ''}
                      className="mx-2 inline-block w-32"
                    >
                      {processedData.answers[number]?.map(option => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </React.Fragment>
                )
              }
              return <span key={index}>{part}</span>
            })}
          </div>
        </div>
      )
    }

    return (
      <div className="text-center text-red-600">
        Unsupported dropdown format. Please check the question configuration.
      </div>
    )
  }

  const renderQuestion = () => {
    if (!currentQuestion) {
      return null
    }

    const answer = userAnswers[currentQuestion.ID] || getDefaultAnswerByType(currentQuestion.Type)

    switch (currentQuestion.Type) {
      case 'dropdown-list':
        return renderDropdownQuestion()
      case 'ordering':
        return (
          <div className="mx-auto w-full max-w-4xl">
            <OrderingQuestion
              options={currentQuestion.AnswerContent.options}
              userAnswer={answer}
              setUserAnswer={handleAnswerSubmit}
            />
          </div>
        )
      case 'matching':
        return (
          <div className="mx-auto w-full max-w-4xl">
            <MatchingQuestion
              {...formatMatchingQuestion(currentQuestion)}
              userAnswer={answer}
              setUserAnswer={handleAnswerSubmit}
            />
          </div>
        )
      case 'multiple-choice':
        return (
          <div className="mx-auto w-full max-w-4xl">
            <MultipleChoice
              questionData={formatMultipleChoiceQuestion(currentQuestion)}
              userAnswer={answer}
              setUserAnswer={handleAnswerSubmit}
              onSubmit={handleAnswerSubmit}
            />
          </div>
        )
      default:
        return <div>Unsupported question type: {currentQuestion.Type}</div>
    }
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-4xl p-5 pb-32">
      <Card className="mb-32">
        <div className="absolute right-4 top-4">
          <FlagButton key={`flag-button-${currentPartIndex}`} onFlag={handleFlagToggle} initialFlagged={isFlagged} />
        </div>

        <Title level={2} className="mb-6 text-3xl font-bold">
          {`Part ${currentPartIndex + 1}`}
        </Title>

        <div className="prose prose-lg mb-8 max-w-none">
          <Text className="block text-lg font-medium text-gray-700">
            {currentPart.Content.startsWith('Part')
              ? currentPart.Content.includes(':')
                ? currentPart.Content.split(':')[1].trim()
                : currentPart.Content.split('-').slice(1).join(' ').trim()
              : currentPart.Content}
          </Text>
        </div>

        {shouldShowContent() && (
          <div className="prose prose-lg mb-8 whitespace-pre-wrap text-base text-gray-800">
            {currentQuestion.Content}
          </div>
        )}

        <div className="prose prose-lg flex max-w-none flex-col gap-4">{renderQuestion()}</div>
      </Card>

      <QuestionNavigatorContainer
        testData={testData}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        setCurrentPartIndex={handlePartChange}
        currentPartIndex={currentPartIndex}
        handleSubmit={handleSubmit}
      />

      <FooterNavigator
        totalParts={testData.Parts.length}
        currentPart={currentPartIndex}
        setCurrentPart={handlePartChange}
        handleSubmit={handleSubmit}
        isLastPart={isLastPart}
      />
    </div>
  )
}

export default ReadingTest
