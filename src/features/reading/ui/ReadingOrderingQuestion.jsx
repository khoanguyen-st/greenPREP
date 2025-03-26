import { useState } from 'react'
import { Spin, Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@shared/config/axios'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining.jsx'
import OrderingQuestion from '@shared/ui/questionType/OrderingQuestion.jsx'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'

const fetchOrderingQuestion = async topicId => {
  const baseUrl = 'https://greenprep-api.onrender.com/api/topics'
  const url = `${baseUrl}/${topicId}`

  try {
    const response = await axiosInstance.get(url, {
      params: { questionType: 'ordering', skillName: 'READING' }
    })
    return response.data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

const ReadingOrderingQuestion = ({ topicId = 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc' }) => {
  const {
    data: testData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchOrderingQuestion', topicId],
    queryFn: () => fetchOrderingQuestion(topicId),
    staleTime: 6000
  })

  const [userAnswers, setUserAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [flaggedQuestions, setFlaggedQuestions] = useState({})
  const questions = testData?.Parts?.flatMap(part => part.Questions) || []
  const totalQuestions = questions.length

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (isError || !testData || totalQuestions === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert message="Error" description="Failed to load test data. Please try again." type="error" showIcon />
      </div>
    )
  }

  const question = questions[currentQuestion] || {}

  const handleAnswerChange = newOrder => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion]: newOrder }))
  }

  const handleFlag = isFlagged => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion]: isFlagged
    }))
  }
  // eslint-disable-next-line no-console
  const handleAutoSubmit = () => console.log('Auto-submit triggered')
  // eslint-disable-next-line no-console
  const handleSubmit = () => console.log('Test submitted')

  return (
    <div className="flex flex-col p-4 sm:p-8 md:flex-row md:p-12">
      <div className="flex-1">
        <FlagButton onFlag={handleFlag} initialFlagged={Boolean(flaggedQuestions[currentQuestion])} />

        <h1 className="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">{testData.Name}</h1>
        <p className="mb-6 font-semibold text-gray-800">
          Instruction: Arrange the following sentences in the correct order to form a coherent paragraph.
        </p>

        <div className="mb-6">
          <OrderingQuestion
            options={question.AnswerContent?.options || []}
            userAnswer={userAnswers[currentQuestion] || []}
            setUserAnswer={handleAnswerChange}
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
          fetchQuestion={undefined}
        />
      </div>
    </div>
  )
}

export default ReadingOrderingQuestion
