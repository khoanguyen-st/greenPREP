import { Typography, Spin } from 'antd'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchWritingTestDetails } from '../api/writingAPI'
import QuestionForm from './writing-question-form'
import QuestionNavigatorContainer from './writing-question-navigator-container'
import { DEFAULT_MAX_WORDS } from '../constance/WritingConst'
import FooterNavigator from './writing-footer-navigator'

const { Title, Text } = Typography

const WritingTest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['writingQuestions'],
    queryFn: async () => {
      const response = await fetchWritingTestDetails()
      const sortedParts = response.Parts.sort((a, b) => {
        const partNumberA = parseInt(a.Content.match(/Part (\d+)/)?.[1]) || 0
        const partNumberB = parseInt(b.Content.match(/Part (\d+)/)?.[1]) || 0
        return partNumberA - partNumberB
      })
      return { ...response, Parts: sortedParts }
    }
  })

  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('writingAnswers')) || {})
  const [wordCounts, setWordCounts] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState(
    () => JSON.parse(localStorage.getItem('flaggedQuestions')) || {}
  )

  useEffect(() => {
    if (data) {
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
        part.Questions.forEach((question, index) => {
          const fieldName = `answer-${part.ID}-${index}`
          newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || '')
        })
      })
    }
    setWordCounts(newWordCounts)
  }

  const handleFlagToggle = questionId => {
    const updatedFlags = {
      ...flaggedQuestions,
      [questionId]: !flaggedQuestions[questionId]
    }
    setFlaggedQuestions(updatedFlags)
    localStorage.setItem('flaggedQuestions', JSON.stringify(updatedFlags))
  }

  const handleTextChange = (field, text) => {
    const newAnswers = { ...answers, [field]: text }
    setAnswers(newAnswers)
    localStorage.setItem('writingAnswers', JSON.stringify(newAnswers))
    setWordCounts(prev => ({
      ...prev,
      [field]: countWords(text)
    }))
  }

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.table(answers)
    localStorage.removeItem('writingAnswers')
    localStorage.removeItem('flaggedQuestions')
  }

  if (isLoading) {
    return <Spin className="flex h-screen items-center justify-center" />
  }
  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>
  }

  if (!data || !data.Parts || data.Parts.length === 0) {
    return <div className="text-center text-gray-500">No test data available</div>
  }

  const currentPart = data.Parts[currentPartIndex]
  const partNumber = parseInt(currentPart.Content.match(/Part (\d+)/)?.[1]) || 0

  return (
    <div className="relative mx-auto min-h-screen max-w-3xl pb-24">
      <Title level={1} className="mt-12 text-left text-3xl font-bold">
        Writing Test
      </Title>
      <Text className="text-l mb-5 font-semibold">
        Question {currentPartIndex + 1} of {data.Parts.length}
      </Text>
      <Text className="mb-3 mt-8 block text-lg font-semibold xs:mx-2 md:mx-0 md:text-xl">{currentPart.Content}</Text>
      <QuestionForm
        currentPart={currentPart}
        partNumber={partNumber}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        handleFlagToggle={handleFlagToggle}
        handleTextChange={handleTextChange}
        countWords={countWords}
        wordCounts={wordCounts}
        DEFAULT_MAX_WORDS={DEFAULT_MAX_WORDS}
      />

      <QuestionNavigatorContainer
        data={data}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
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
