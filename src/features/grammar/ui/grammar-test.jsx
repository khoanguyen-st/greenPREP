import { useQuery } from '@tanstack/react-query'
import { Card, Divider, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchGrammarTestDetails } from '../api/grammarAPI'
import FooterNavigator from './grammar-footer-navigator'
import QuestionForm from './grammar-question-form'
import QuestionNavigatorContainer from './grammar-question-navigator-container'

const { Title } = Typography

const GrammarTest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['grammarQuestions'],
    queryFn: async () => {
      const response = await fetchGrammarTestDetails()
      const sortedParts = response.Parts.sort((a, b) => {
        const partNumberA = parseInt(a.Content.match(/Part (\d+)/)?.[1]) || 0
        const partNumberB = parseInt(b.Content.match(/Part (\d+)/)?.[1]) || 0
        return partNumberA - partNumberB
      })

      return { ...response, Parts: sortedParts }
    }
  })

  const navigate = useNavigate()

  const mergedArray = data?.Parts.flatMap(part => part.Questions) || []

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('grammarAnswers')) || {})

  const [flaggedQuestions, setFlaggedQuestions] = useState(
    () => JSON.parse(localStorage.getItem('flaggedQuestions')) || {}
  )

  const handleFlagToggle = questionId => {
    const updatedFlags = {
      ...flaggedQuestions,
      [questionId]: !flaggedQuestions[questionId]
    }
    setFlaggedQuestions(updatedFlags)
    localStorage.setItem('flaggedQuestions', JSON.stringify(updatedFlags))
  }

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.table(answers)
    localStorage.removeItem('grammarAnswers')
    localStorage.removeItem('flaggedQuestions')
    navigate('/reading')
  }

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      localStorage.setItem('grammarAnswers', JSON.stringify(answers))
    }
  }, [answers])

  if (isLoading) {
    return <Spin className="flex h-screen items-center justify-center" />
  }
  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>
  }
  if (!mergedArray.length) {
    return <div className="text-center text-gray-500">No test data available</div>
  }

  const currentQuestion = mergedArray[currentQuestionIndex]
  return (
    <div className="relative mx-auto min-h-screen max-w-3xl pb-24">
      <Divider orientation="left">
        <Typography.Title level={1}>Grammar test</Typography.Title>
      </Divider>

      <Card className="mb-6">
        <Title level={3} className="text-l mb-5 font-semibold">
          Question {currentQuestionIndex + 1} of {mergedArray.length}
        </Title>
        <QuestionForm
          currentPart={currentQuestion}
          answers={answers}
          setUserAnswer={setAnswers}
          flaggedQuestions={flaggedQuestions}
          handleFlagToggle={handleFlagToggle}
          onSubmit={handleSubmit}
        />
      </Card>

      <QuestionNavigatorContainer
        data={{ Parts: mergedArray }}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        setCurrentPartIndex={setCurrentQuestionIndex}
        currentPartIndex={currentQuestionIndex}
        handleSubmit={handleSubmit}
      />

      <FooterNavigator
        totalQuestions={mergedArray.length}
        currentQuestion={currentQuestionIndex}
        setCurrentQuestion={setCurrentQuestionIndex}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default GrammarTest
