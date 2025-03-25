import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import DropdownQuestion from '@shared/ui/questionType/DropdownQuestion.jsx'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining.jsx'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import FlagButton from '@shared/ui/FLagButton/FlagButton'

// API Fetch Function
const fetchTopic = async () => {
  const response = await axios.get(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=dropdown-list&skillName=READING'
  )
  return response.data
}

const ReadingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topic'],
    queryFn: fetchTopic
  })

  // State quản lý đáp án
  const [answers, setAnswers] = useState({})
  // State lưu vị trí câu hỏi hiện tại
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // State lưu trạng thái flagged của từng câu hỏi
  const [flaggedQuestions, setFlaggedQuestions] = useState({})
  const [errorState, setErrorState] = useState(null)

  // Hàm cập nhật đáp án khi người dùng chọn
  const handleAnswerChange = (questionId, key, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [key]: value
      }
    }))
  }

  // Hàm xử lý khi người dùng đánh dấu hoặc bỏ đánh dấu câu hỏi
  const handleFlagToggle = (questionId, isFlagged) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: isFlagged
    }))
  }

  const fetchQuestion = async questionIndex => {
    try {
      // Simulate fetching a specific question (if needed).
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulated delay
      setErrorState(null)
    } catch {
      setErrorState('Failed to load the question. Please try again.')
    }
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      try {
        await fetchQuestion(currentQuestion + 1)
        setCurrentQuestion(currentQuestion + 1)
      } catch {
        setErrorState('Failed to load the next question. Please try again.')
      }
    }
  }

  const handlePrev = async () => {
    if (currentQuestion > 0) {
      try {
        await fetchQuestion(currentQuestion - 1)
        setCurrentQuestion(currentQuestion - 1)
      } catch {
        setErrorState('Failed to load the previous question. Please try again.')
      }
    }
  }

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>
  }

  // Danh sách câu hỏi
  const questions = data.Parts.flatMap(part =>
    part.Questions.map(q => ({
      id: q.ID,
      type: answers[q.ID] ? 'answered' : 'unanswered',
      data: q
    }))
  )

  return (
    <div className="mx-auto max-w-4xl p-4">
      {/* Bộ đếm thời gian */}
      <TimeRemaining duration={10 * 60} onAutoSubmit={() => alert('Auto-submit triggered')} />

      <h1 className="mb-4 text-2xl font-bold">{data.Name}</h1>

      {/* Điều hướng câu hỏi */}
      <QuestionNavigator values={questions} action={setCurrentQuestion} position={currentQuestion} />

      {/* Hiển thị câu hỏi hiện tại */}
      {questions.length > 0 && (
        <div className="relative mt-4 rounded-md border p-4 shadow-md">
          {/* Nút Flag cho từng câu hỏi */}
          <div className="absolute right-4 top-4">
            <FlagButton
              onFlag={isFlagged => handleFlagToggle(questions[currentQuestion].id, isFlagged)}
              initialFlagged={flaggedQuestions[questions[currentQuestion].id] || false}
            />
          </div>

          <DropdownQuestion questionData={questions[currentQuestion].data} onChange={handleAnswerChange} />
        </div>
      )}

      {/* Nút điều hướng giữa các câu hỏi */}
      <NavigationButtons
        totalQuestions={questions.length}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        fetchQuestion={fetchQuestion}
        onSubmit={() => alert('Test submitted')}
      />

      {errorState && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-red-600">Error</h2>
            <p className="text-gray-700">{errorState}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => fetchQuestion(currentQuestion)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadingPage
