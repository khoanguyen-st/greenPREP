import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@shared/config/axios'
import { Spin, Alert } from 'antd'
<<<<<<< HEAD
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion.jsx'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining.jsx'
=======
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import FlagButton from '@shared/ui/FLagButton/FlagButton'

const fetchTestData = async (topicId, questionType, skillName) => {
  const baseUrl = 'https://greenprep-api.onrender.com/api/topics'
  const url = `${baseUrl}/${topicId}`

  try {
    const response = await axiosInstance.get(url, {
      params: { questionType, skillName }
    })
    return response.data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

const ReadingMatchingQuestion = ({
  topicId = 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
  questionType = 'matching',
  skillName = 'READING'
}) => {
  const {
    data: testData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchTestData', topicId, questionType, skillName],
    queryFn: () => fetchTestData(topicId, questionType, skillName),
    staleTime: 6000
  })

<<<<<<< HEAD
  const [matches, setMatches] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [flaggedQuestions, setFlaggedQuestions] = useState({})
  const totalQuestions = testData?.Parts?.[0]?.Questions?.length || 1

  const handleMatchChange = (leftId, rightId) => {
    setMatches(prev => ({ ...prev, [leftId]: rightId }))
  }

  const handleFlag = isFlagged => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion]: isFlagged
    }))
  }

  const handleAutoSubmit = () => alert('Auto-submit triggered')
  const handleSubmit = () => alert('Test submitted')
=======
  const [userAnswers, setUserAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

<<<<<<< HEAD
  if (isError || !testData || !testData.Parts?.[0]?.Questions?.[0]) {
=======
  if (isError || !testData?.Parts?.[0]?.Questions?.length) {
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert message="Error" description="Failed to load test data. Please try again." type="error" showIcon />
      </div>
    )
  }

<<<<<<< HEAD
  const question = testData.Parts[0].Questions[currentQuestion]
  const answerContent = question.AnswerContent

  const formattedContent = question.Content.split('Paragraph ').map((paragraph, index) => {
=======
  const totalQuestions = testData.Parts[0].Questions.length
  const currentQuestion = testData.Parts[0].Questions[currentQuestionIndex]

  const formattedContent = currentQuestion.Content.split('Paragraph ').map((paragraph, index) => {
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
    if (index === 0) {
      return paragraph
    }
    return (
      <React.Fragment key={index}>
        {'\n'}
        <strong>{`Paragraph ${paragraph.split(' - ')[0]}: `}</strong>
        {paragraph.split(' - ')[1]}
      </React.Fragment>
    )
  })

<<<<<<< HEAD
  return (
    <div className="flex flex-col p-4 sm:p-8 md:flex-row md:p-12">
      <div className="flex-1">
        <FlagButton onFlag={handleFlag} initialFlagged={Boolean(flaggedQuestions[currentQuestion])} />

=======
  const formatQuestionData = question => {
    if (!question) {
      return null
    }

    try {
      const answerContent =
        typeof question.AnswerContent === 'string' ? JSON.parse(question.AnswerContent) : question.AnswerContent

      if (!answerContent.leftItems || !answerContent.rightItems) {
        throw new Error('Invalid question format: missing required fields')
      }

      return {
        leftItems: answerContent.leftItems.map((item, index) => ({ id: index + 1, label: item })),
        rightItems: answerContent.rightItems.map((item, index) => ({
          id: String.fromCharCode(97 + index),
          label: item
        }))
      }
    } catch (error) {
      console.error('Error formatting question data:', error)
      return null
    }
  }

  const formattedQuestion = formatQuestionData(currentQuestion)
  const handleAnswerSubmit = answer => {
    if (!currentQuestion) {
      return
    }
    setUserAnswers({ ...userAnswers, [currentQuestion.ID]: answer })
  }

  const toggleFlag = isFlagged => {
    if (!currentQuestion) {
      return
    }
    setFlaggedQuestions(prev =>
      isFlagged ? [...prev, currentQuestion.ID] : prev.filter(id => id !== currentQuestion.ID)
    )
  }

  return (
    <div className="flex flex-col p-4 sm:p-8 md:flex-row md:p-12">
      <div className="flex-1">
        <FlagButton onFlag={toggleFlag} initialFlagged={flaggedQuestions.includes(currentQuestion?.ID)} />
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
        <h1 className="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">{testData.Name}</h1>
        <p className="mb-8 space-y-3 whitespace-pre-line px-4 text-base leading-relaxed text-gray-800 sm:text-lg">
          {formattedContent}
        </p>
<<<<<<< HEAD

        <div className="mb-6">
          <MatchingQuestion
            leftItems={answerContent.leftItems.map(item => ({ id: item, label: item }))}
            rightItems={answerContent.rightItems.map(item => ({ id: item, label: item }))}
            matches={matches}
            onChange={handleMatchChange}
          />
        </div>
      </div>

      <div className="flex w-full flex-col space-y-6 md:w-1/3 lg:w-1/4">
        <TimeRemaining duration={35 * 60} onAutoSubmit={handleAutoSubmit} />

        <QuestionNavigator
          values={Array.from({ length: totalQuestions }, (_, i) => ({
            type: flaggedQuestions[i] ? 'flagged' : 'unanswered'
          }))}
          action={setCurrentQuestion}
          position={currentQuestion}
        />

        <NavigationButtons
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          onSubmit={handleSubmit}
=======
        <div className="mb-6">
          {formattedQuestion && (
            <MatchingQuestion
              leftItems={formattedQuestion.leftItems}
              rightItems={formattedQuestion.rightItems}
              userAnswer={userAnswers[currentQuestion?.ID] || []}
              setUserAnswer={handleAnswerSubmit}
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-col space-y-6 md:w-1/3 lg:w-1/4">
        <TimeRemaining duration={35 * 60} onAutoSubmit={() => alert('Auto-submit triggered')} />
        <QuestionNavigator
          values={Array.from({ length: totalQuestions }, (_, i) => ({
            type: flaggedQuestions.includes(i) ? 'flagged' : 'unanswered'
          }))}
          action={setCurrentQuestionIndex}
          position={currentQuestionIndex}
        />
        <NavigationButtons
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestionIndex}
          setCurrentQuestion={setCurrentQuestionIndex}
          onSubmit={() => alert('Test submitted')}
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
          fetchQuestion={undefined}
        />
      </div>
    </div>
  )
}

export default ReadingMatchingQuestion
