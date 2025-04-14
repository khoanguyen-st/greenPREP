import { GrammarSubmission } from '@assets/images'
import { fetchGrammarTestDetails } from '@features/grammar/api/grammarAPI'
import FooterNavigator from '@features/grammar/ui/grammar-footer-navigator'
import QuestionForm from '@features/grammar/ui/grammar-question-form'
import QuestionNavigatorContainer from '@features/grammar/ui/grammar-question-navigator-container'
import FlagButton from '@shared/ui/flag-button'
import NextScreen from '@shared/ui/submission/next-screen'
import { useQuery } from '@tanstack/react-query'
import { Card, Divider, Spin, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const { Title } = Typography

const GrammarTest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  //   @ts-ignore
  const sessionData = useSelector(state => state.session?.currentSession)
  // @ts-ignore
  const studentData = useSelector(state => state.auth?.user)

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

  const handleSubmit = async () => {
    // eslint-disable-next-line no-console
    console.table(answers)
    try {
      const questionsArray = Object.entries(answers)
        .map(([questionId, answer]) => {
          const question = mergedArray.find(q => q.ID === questionId)
          if (!question) {
            return null
          }

          let answerText = null
          if (typeof answer === 'string') {
            answerText = answer
          } else if (Array.isArray(answer)) {
            if (answer[0]?.left !== undefined) {
              answerText = answer
            } else if (answer[0]?.key !== undefined) {
              answerText = answer
            } else if (answer[0]?.ID !== undefined) {
              answerText = answer
            }
          }

          return {
            questionId,
            answerText,
            answerAudio: null
          }
        })
        .filter(Boolean)

      const payload = {
        studentId: studentData?.id || '7661abc8e-55a0-4d95-89e4-784acd81227d',
        topicId: sessionData?.topicId || 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
        skillName: 'GRAMMAR AND VOCABULARY',
        sessionParticipantId: sessionData?.participantId || 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
        questions: questionsArray
      }

      localStorage.setItem('grammar_formatted_answers', JSON.stringify(payload))
      localStorage.removeItem('grammarAnswers')
      localStorage.removeItem('flaggedQuestions')
      setAnswers({})
      setIsSubmitted(true)
    } catch {
      message.error('Failed to submit the test. Please try again.')
    }
  }

  useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      localStorage.setItem('grammarAnswers', JSON.stringify(answers))
    }
  }, [answers])

  if (isSubmitted) {
    return <NextScreen nextPath="/reading" skillName="Grammar&Vocabulary" imageSrc={GrammarSubmission} />
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
          <Title level={3} className="text-l mb-5 w-3/4 font-semibold">
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
