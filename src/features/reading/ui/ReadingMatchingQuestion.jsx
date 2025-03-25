import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@shared/config/axios'
import { Spin, Alert } from 'antd'
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
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

  const handleAutoSubmit = () => {
    // Placeholder for auto-submit logic
    alert('Auto-submit triggered')
  }

  const handleSubmit = () => {
    // Placeholder for submit logic
    alert('Test submitted')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (isError || !testData || !testData.Parts?.[0]?.Questions?.[0]) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert message="Error" description="Failed to load test data. Please try again." type="error" showIcon />
      </div>
    )
  }

  const question = testData.Parts[0].Questions[currentQuestion]
  const answerContent = question.AnswerContent

  const formattedContent = question.Content.split('Paragraph ').map((paragraph, index) => {
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

  return (
    <div className="flex flex-col p-4 sm:p-8 md:flex-row md:p-12">
      <div className="flex-1">
        <FlagButton onFlag={handleFlag} initialFlagged={Boolean(flaggedQuestions[currentQuestion])} />

        <h1 className="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">{testData.Name}</h1>
        <p className="mb-8 space-y-3 whitespace-pre-line px-4 text-base leading-relaxed text-gray-800 sm:text-lg">
          {formattedContent}
        </p>

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
          fetchQuestion={undefined}
        />
      </div>
    </div>
  )
}

export default ReadingMatchingQuestion
