import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import { useState } from 'react'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import PopupSubmission from '@shared/ui/Submission/PopupSubmission'

const QuestionNavigatorContainer = ({
  data,
  answers,
  flaggedQuestions,
  setCurrentPartIndex,
  currentPartIndex,
  handleSubmit
}) => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  return (
    <>
      <PopupSubmission isOpen={isPopupOpen} type="timeout" onSubmit={handleSubmit} />
      <div>
        <Button
          className="fixed bottom-[50%] right-5 rounded-full bg-blue-500 p-2 text-white shadow-lg md:hidden"
          onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
        >
          <MenuOutlined />
        </Button>
        <div
          className={`border-black-300 z-1 fixed right-2 h-auto w-60 rounded-lg border bg-white p-2 shadow-lg ${isNavigatorOpen ? 'block' : 'hidden'} bottom-[65%] md:block mdL:bottom-[70%]`}
        >
          <TimeRemaining duration={10 * 60} onAutoSubmit={() => setIsPopupOpen(true)} />
          <QuestionNavigator
            values={data.Parts.map(part => {
              const isFlagged = part.Questions.some((_, index) => flaggedQuestions[`answer-${part.ID}-${index}`])
              const isAnswered = Object.keys(answers).some(
                key => key.startsWith(`answer-${part.ID}`) && answers[key]?.trim() !== ''
              )

              let type = 'unanswered'
              if (isAnswered && isFlagged) {
                type = 'answered-flagged'
              } else if (isFlagged) {
                type = 'flagged'
              } else if (isAnswered) {
                type = 'answered'
              }
              return { type }
            })}
            action={setCurrentPartIndex}
            position={currentPartIndex}
          />
        </div>
      </div>
    </>
  )
}

export default QuestionNavigatorContainer
