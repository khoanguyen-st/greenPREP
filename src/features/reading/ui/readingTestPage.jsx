import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import DropdownQuestion from '@shared/ui/questionType/DropdownQuestion'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons.jsx'

import { fetchTopic } from '../APi/readingAPI.js'

const ReadingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topic'],
    queryFn: fetchTopic
  })

  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [flaggedQuestions, setFlaggedQuestions] = useState({})

  // Lấy dữ liệu từ localStorage khi load trang
  useEffect(() => {
    const savedAnswers = localStorage.getItem('reading_answers')
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  // Lưu vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('reading_answers', JSON.stringify(answers))
  }, [answers])

  const handleAnswerChange = (questionId, key, value) => {
    setAnswers(prev => {
      const updatedAnswers = {
        ...prev,
        [questionId]: {
          ...(prev[questionId] || {}),
          [key]: value
        }
      }
      return updatedAnswers
    })
  }

  const handleFlagToggle = (questionId, isFlagged) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: isFlagged
    }))
  }

  const handleSubmit = () => {
    console.warn('Submit answers:', answers)
  }

  const fetchQuestion = async index => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index)
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center text-blue-500">Loading...</div>
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()} className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
          Thử lại
        </button>
      </div>
    )
  }

  const questions = data?.Parts
    ? data.Parts.flatMap(part =>
        part.Questions.map(q => ({
          id: q.ID,
          type: answers[q.ID] ? 'answered' : 'unanswered',
          data: q
        }))
      )
    : []

  // Cập nhật trạng thái câu hỏi đã trả lời hay chưa
  const navigatorValues = questions.map(q => ({
    type: flaggedQuestions[q.id] ? 'flagged' : answers[q.id] ? 'answered' : 'unanswered'
  }))

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">{data?.Name}</h1>

      <QuestionNavigator values={navigatorValues} action={setCurrentQuestion} position={currentQuestion} />

      {questions.length > 0 && (
        <div className="relative mt-6 rounded-md border bg-gray-100 p-6 shadow-md">
          <div className="absolute right-4 top-4">
            <FlagButton
              onFlag={isFlagged => handleFlagToggle(questions[currentQuestion]?.id, isFlagged)}
              initialFlagged={flaggedQuestions[questions[currentQuestion]?.id] || false}
            />
          </div>
          <DropdownQuestion
            questionData={questions[currentQuestion]?.data}
            userAnswer={answers[questions[currentQuestion]?.id] || {}}
            setUserAnswer={(key, value) => handleAnswerChange(questions[currentQuestion]?.id, key, value)}
          />
        </div>
      )}

      <NavigationButtons
        totalQuestions={questions.length}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        fetchQuestion={fetchQuestion}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default ReadingPage
