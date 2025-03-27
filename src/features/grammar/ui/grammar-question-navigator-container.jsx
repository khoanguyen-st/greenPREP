import { MenuOutlined } from '@ant-design/icons'
import QuestionNavigator from '@shared/ui/question-navigatior'
import TimeRemaining from '@shared/ui/time-remaining'
import { Button } from 'antd'
import { useState } from 'react'

const QuestionNavigatorContainer = ({
  data,
  answers,
  flaggedQuestions,
  setCurrentPartIndex,
  currentPartIndex,
  handleSubmit
}) => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  return (
    <div>
      <Button
        className="fixed bottom-[50%] right-5 rounded-full bg-blue-500 p-2 text-white shadow-lg md:hidden"
        onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
      >
        <MenuOutlined />
      </Button>
      <div
        className={`border-black-300 fixed right-2 z-10 h-auto w-60 overflow-y-auto rounded-lg border bg-white p-2 shadow-lg ${isNavigatorOpen ? 'block' : 'hidden'} top-[15%] md:block`}
      >
        <TimeRemaining duration={10 * 60} onAutoSubmit={handleSubmit} />
        <QuestionNavigator
          values={data.Parts.map(question => {
            const isFlagged = flaggedQuestions[`answer-${question.ID}`] || false
            const isAnswered = Object.keys(answers).some(key => key.startsWith(question.ID) && answers[key] !== '')

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
  )
}

export default QuestionNavigatorContainer
