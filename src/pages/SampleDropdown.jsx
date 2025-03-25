import FlagButton from '@shared/ui/FlagButton/FlagButton.jsx'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior.jsx'
import DropdownQuestion from '@shared/ui/questionType/DropdownQuestion.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

// API Fetch Function
const fetchTopic = async () => {
  const response = await axios.get(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=dropdown-list&skillName=READING'
  )
  return response.data
}

const SampleDrop = () => {
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

  if (isLoading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-center text-red-500">Error: {error.message}</div>

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


    </div>
  )
}

export default SampleDrop