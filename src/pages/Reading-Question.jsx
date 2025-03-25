import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import DropdownQuestion from '/src/shared/ui/questionType/DropdownQuestion.jsx'
import TimeRemaining from '/src/shared/ui/TimeRemaining/TimeRemaining.jsx'

import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons.jsx'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior.jsx'
import FlagButton from '@shared/ui/FlagButton/FlagButton.jsx'

// API Fetch Function using react-query with fetch
const fetchTopic = async () => {
  const response = await fetch(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=dropdown-list&skillName=READING'
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const ReadingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topic'],
    queryFn: fetchTopic,
    staleTime: 60000,
    cacheTime: 300000
  })

  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [flaggedQuestions, setFlaggedQuestions] = useState({})

  const handleAnswerChange = (questionId, key, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [key]: value
      }
    }))
  }

  const handleFlagToggle = (questionId, isFlagged) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: isFlagged
    }))
  }

  if (isLoading) {
    return <div className="p-4 text-center text-blue-500">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>
  }

  const questions = data.Parts.flatMap(part =>
    part.Questions.map(q => ({
      id: q.ID,
      type: answers[q.ID] ? 'answered' : 'unanswered',
      data: q
    }))
  )

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <TimeRemaining duration={10 * 60} onAutoSubmit={() => console.warn('Auto-submit triggered')} />
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">{data.Name}</h1>
      <QuestionNavigator values={questions} action={setCurrentQuestion} position={currentQuestion} />
      {questions.length > 0 && (
        <div className="relative mt-6 rounded-md border bg-gray-100 p-6 shadow-md">
          <div className="absolute right-4 top-4">
            <FlagButton
              onFlag={isFlagged => handleFlagToggle(questions[currentQuestion].id, isFlagged)}
              initialFlagged={flaggedQuestions[questions[currentQuestion].id] || false}
            />
          </div>
          <DropdownQuestion questionData={questions[currentQuestion].data} onChange={handleAnswerChange} />
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <NavigationButtons
          onNext={() => setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1))}
          onPrev={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
        />
      </div>
    </div>
  )
}

export default ReadingPage
