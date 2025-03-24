// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert } from 'antd'
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion.jsx'

const fetchTestData = async () => {
  const response = await fetch(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=matching&skillName=READING'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch test data')
  }
  return response.json()
}

const ReadingMatchingQuestion = () => {
  const {
    data: testData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchTestData'],
    queryFn: fetchTestData
  })

  const [matches, setMatches] = useState({})

  const handleMatchChange = (leftId, rightId) => {
    setMatches(prev => ({ ...prev, [leftId]: rightId }))
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <Alert message="Error" description="Failed to load test data. Please try again." type="error" showIcon />
      </div>
    )
  }

  if (!testData || !testData.Parts || !testData.Parts[0].Questions[0]) {
    return <div className="text-center text-red-500">No test data available.</div>
  }

  const question = testData.Parts[0].Questions[0]
  const answerContent = question.AnswerContent

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">{testData.Name}</h1>
      <p className="mb-4">{question.Content}</p>
      <MatchingQuestion
        leftItems={answerContent.leftItems.map(item => ({ id: item, label: item }))}
        rightItems={answerContent.rightItems.map(item => ({ id: item, label: item }))}
        matches={matches}
        onChange={handleMatchChange}
      />
    </div>
  )
}

export default ReadingMatchingQuestion
