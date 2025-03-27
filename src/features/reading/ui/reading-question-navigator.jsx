import { MenuOutlined } from '@ant-design/icons'
import QuestionNavigator from '@shared/ui/question-navigatior'
import PopupSubmission from '@shared/ui/submission/popup-submission'
import TimeRemaining from '@shared/ui/time-remaining'
import { Button } from 'antd'
import { useState, useEffect } from 'react'

const QuestionNavigatorContainer = ({
  testData,
  userAnswers,
  flaggedQuestions,
  setCurrentPartIndex,
  currentPartIndex,
  handleSubmit
}) => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [partStatuses, setPartStatuses] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    const statuses = testData.Parts.map((part, index) => {
      const partQuestions = part.Questions
      const allAnswered = partQuestions.every(q => userAnswers[q.ID] !== undefined && userAnswers[q.ID] !== '')
      const hasFlagged = partQuestions.some(q => Array.isArray(flaggedQuestions) && flaggedQuestions.includes(q.ID))

      if (allAnswered && hasFlagged) {
        return 'answered-flagged'
      }
      if (allAnswered) {
        return 'answered'
      }
      if (hasFlagged) {
        return 'flagged'
      }
      if (index === currentPartIndex) {
        return 'current'
      }
      return 'unanswered'
    })
    setPartStatuses(statuses)
  }, [testData.Parts, userAnswers, flaggedQuestions, currentPartIndex])

  const handlePartChange = index => {
    setCurrentPartIndex(index)
    setIsNavigatorOpen(false)
  }

  const handleAutoSubmit = () => {
    setIsPopupOpen(true)
  }

  const handleTimeoutSubmit = () => {
    setIsPopupOpen(false)
    handleSubmit()
  }

  return (
    <>
      <div className="relative">
        <Button
          className="fixed bottom-[50%] right-5 z-[48] rounded-full bg-blue-500 p-2 text-white shadow-lg md:hidden"
          onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
        >
          <MenuOutlined />
        </Button>
        <div
          className={`border-black-300 fixed right-2 h-auto w-60 rounded-lg border bg-white p-2 shadow-lg ${
            isNavigatorOpen ? 'block' : 'hidden'
          } bottom-[65%] z-[48] md:block mdL:bottom-[70%]`}
        >
          <TimeRemaining duration={35 * 60} onAutoSubmit={handleAutoSubmit} />
          <QuestionNavigator
            values={partStatuses.map(status => ({
              type: status
            }))}
            action={handlePartChange}
            position={currentPartIndex}
          />
        </div>
      </div>

      <div className="z-[50]">
        <PopupSubmission isOpen={isPopupOpen} type="timeout" onSubmit={handleTimeoutSubmit} />
      </div>
    </>
  )
}

export default QuestionNavigatorContainer
