import { useState } from 'react'
import { Typography, Spin, Alert, Space, Row, Col } from 'antd'
import axiosInstance from '@shared/config/axios'
import MultipleChoice from '@shared/ui/questionType/multipleChoice'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import { useQuery } from '@tanstack/react-query'

const { Text } = Typography

const Test = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])

  // Fetch test data using useQuery
  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTest'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=multiple-choice&skillName=LISTENING'
      )
      return response.data
    }
  })

  // Calculate total questions for navigation
  const getTotalQuestions = () => {
    if (!testData || !testData.Parts) return 0
    return testData.Parts.reduce((acc, part) => acc + part.Questions.length, 0)
  }

  // Get current part and question
  const getCurrentPart = () => testData?.Parts[currentPartIndex] || null
  const getCurrentQuestion = () => {
    const part = getCurrentPart()
    return part?.Questions[currentQuestionIndex] || null
  }

  // Create a flat array of all questions with part information for navigation
  const getAllQuestions = () => {
    if (!testData?.Parts) return []

    const questions = []
    testData.Parts.forEach((part, partIdx) => {
      part.Questions.forEach((question, questionIdx) => {
        questions.push({
          partIndex: partIdx,
          questionIndex: questionIdx,
          question
        })
      })
    })
    return questions
  }

  const getCurrentFlatIndex = () => {
    if (!testData?.Parts) return 0

    let count = 0
    for (let i = 0; i < currentPartIndex; i++) {
      count += testData.Parts[i].Questions.length
    }
    return count + currentQuestionIndex
  }

  const goToNext = () => {
    const currentPart = getCurrentPart()
    if (currentQuestionIndex < currentPart.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentPartIndex < testData.Parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToQuestion = flatIndex => {
    if (!testData?.Parts) return

    let count = 0
    for (let partIdx = 0; partIdx < testData.Parts.length; partIdx++) {
      const partQuestions = testData.Parts[partIdx].Questions.length
      if (count + partQuestions > flatIndex) {
        setCurrentPartIndex(partIdx)
        setCurrentQuestionIndex(flatIndex - count)
        return
      }
      count += partQuestions
    }
  }

  const handleAnswerSubmit = answer => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    setUserAnswers({
      ...userAnswers,
      [currentQuestion.ID]: answer
    })
  }

  const toggleFlag = isFlagged => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return

    if (isFlagged) {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.ID])
    } else {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== currentQuestion.ID))
    }
  }

  const handleAutoSubmit = () => {
    console.log("Time's up! Auto-submitting test.")
    alert("Time's up! Your test will be submitted automatically.")
  }

  const formatQuestionData = question => {
    if (!question) return null

    try {
      const answerContent =
        typeof question.AnswerContent === 'string' ? JSON.parse(question.AnswerContent) : question.AnswerContent

      const options = Array.isArray(answerContent.options)
        ? answerContent.options.map((option, index) => ({
            key: String.fromCharCode(65 + index),
            value: option
          }))
        : []

      const formattedData = {
        ...question,
        AnswerContent: JSON.stringify([
          {
            title: question.Content,
            options,
            correctAnswer: answerContent.correctAnswer
          }
        ])
      }

      console.log('Formatted question data:', formattedData)
      return formattedData
    } catch (error) {
      console.error('Error formatting question data:', error)
      return null
    }
  }

  if (isLoading) {
    return <Spin size="large" className="flex min-h-screen items-center justify-center" />
  }

  if (error) {
    return <Alert type="error" message="Failed to load test data" description={error.message} />
  }

  const currentQuestion = getCurrentQuestion()
  console.log('Current question:', currentQuestion)

  const formattedQuestion = formatQuestionData(currentQuestion)
  const flatIndex = getCurrentFlatIndex()
  const totalQuestions = getTotalQuestions()
  const isFlagged = currentQuestion && flaggedQuestions.includes(currentQuestion.ID)

  const fetchNextQuestion = () => {
    goToNext()
  }

  const questionNavigatorValues = getAllQuestions().map((q, idx) => {
    const isQuestionFlagged = flaggedQuestions.includes(q.question.ID)
    const isQuestionAnswered = userAnswers[q.question.ID] !== undefined

    return {
      index: idx,
      type:
        isQuestionAnswered && isQuestionFlagged
          ? 'answered-flagged'
          : isQuestionFlagged
            ? 'flagged'
            : isQuestionAnswered
              ? 'answered'
              : 'unanswered',
      part: q.partIndex
    }
  })

  return (
    <div className="mx-auto max-w-7xl p-6 pb-20">
      <Row gutter={[24, 24]}>
        <Col span={4} />

        {/* Main content column contains:
            - Skill name
            - Question # of #
            - Question and Answers
        */}
        <Col span={14} className="w-full">
          <Space direction="vertical" size="large" className="mt-20 w-full">
            <Text strong className="text-4xl">
              {testData.Parts[0].Questions[0].Skill.Name}
            </Text>

            <div className="flex justify-between">
              <Text strong className="text-4xl">
                Question {flatIndex + 1} of {totalQuestions}
              </Text>
              <div className="flex items-end gap-2">
                <FlagButton key={currentQuestion?.ID} initialFlagged={isFlagged} onFlag={toggleFlag} />
              </div>
            </div>

            {formattedQuestion && (
              <MultipleChoice questionData={formattedQuestion} onSubmit={handleAnswerSubmit} className="mt-6" />
            )}

            <div className="mt-8 flex justify-between">
              <NavigationButtons
                totalQuestions={totalQuestions}
                currentQuestion={flatIndex}
                setCurrentQuestion={goToQuestion}
                fetchQuestion={fetchNextQuestion}
                onSubmit={handleAnswerSubmit}
              />
            </div>
          </Space>
        </Col>

        {/* Timer and QuestionNavigator column */}
        <Col span={6}>
          <div className="flex flex-col items-end">
            <TimeRemaining duration={40 * 60} onAutoSubmit={handleAutoSubmit} label="Time Remaining" />
          </div>
          <div className="mt-32">
            <QuestionNavigator values={questionNavigatorValues} action={goToQuestion} position={flatIndex} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Test
