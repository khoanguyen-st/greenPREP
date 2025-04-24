import { GrammarSubmission } from '@assets/images'
import { fetchGrammarTestDetails } from '@features/grammar/api'
import { submitGrammarTest } from '@features/grammar/service'
import FooterNavigator from '@features/grammar/ui/grammar-footer-navigator'
import QuestionForm from '@features/grammar/ui/grammar-question-form'
import QuestionNavigatorContainer from '@features/grammar/ui/grammar-question-navigator-container'
import FlagButton from '@shared/ui/flag-button'
import NextScreen from '@shared/ui/submission/next-screen'
import { useQuery } from '@tanstack/react-query'
import { Card, Divider, Spin, Typography } from 'antd'
import { useEffect, useState, useCallback } from 'react'

const { Title } = Typography
const GrammarTest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['grammarQuestions'],
    queryFn: async () => {
      const response = await fetchGrammarTestDetails()
      const sortedParts = response.Parts.sort((a, b) => {
        const partNumberA = parseInt(a.Content.match(/Part (\d+)/)?.[1]) || 0
        const partNumberB = parseInt(b.Content.match(/Part (\d+)/)?.[1]) || 0
        return partNumberA - partNumberB
      })

      sortedParts.forEach(part => {
        if (part.Questions && Array.isArray(part.Questions)) {
          part.Questions.sort((a, b) => {
            const sequenceA = a.Sequence || 0
            const sequenceB = b.Sequence || 0
            return sequenceA - sequenceB
          })
        }
      })

      return { ...response, Parts: sortedParts }
    }
  })

  const mergedArray = data?.Parts.flatMap(part => part.Questions) || []

  mergedArray.sort((a, b) => {
    const sequenceA = a.Sequence || 0
    const sequenceB = b.Sequence || 0
    return sequenceA - sequenceB
  })

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

  const handleSubmit = useCallback(async () => {
    await submitGrammarTest({ data, answers })
    setIsSubmitted(true)
    localStorage.setItem('current_skill', 'reading')
  }, [data, answers])

  const handleForceSubmit = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  useEffect(() => {
    window.addEventListener('forceSubmit', handleForceSubmit)
    return () => {
      window.removeEventListener('forceSubmit', handleForceSubmit)
    }
  }, [handleForceSubmit])

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      localStorage.setItem('grammarAnswers', JSON.stringify(answers))
    }
  }, [answers])

  if (isSubmitted) {
    return <NextScreen nextPath="/reading" skillName="Grammar & Vocabulary" imageSrc={GrammarSubmission} />
  }

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
        <Typography.Title level={1}>Grammar and Vocabulary</Typography.Title>
      </Divider>

      <Card className="mb-6 flex w-full">
        <div className="mb-5 flex flex-row gap-80">
          <Title level={2} className="text-l mb-5 w-3/4 font-semibold">
            Question {currentQuestionIndex + 1} of {mergedArray.length}
          </Title>
          <FlagButton
            initialFlagged={flaggedQuestions[`answer-${currentQuestion.ID}`] || false}
            onFlag={() => handleFlagToggle(`answer-${currentQuestion.ID}`)}
          />
        </div>

        <QuestionForm
          currentPart={currentQuestion}
          answers={answers}
          setUserAnswer={setAnswers}
          onSubmit={handleSubmit}
          questionNumber={currentQuestionIndex + 1}
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
