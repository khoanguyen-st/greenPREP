import { MenuOutlined } from '@ant-design/icons'
import { navigateLogo } from '@assets/images'
import FlagButton from '@shared/ui/flag-button'
import NavigationButtons from '@shared/ui/navigation-button'
import QuestionNavigator from '@shared/ui/question-navigatior'
import PopupSubmission from '@shared/ui/submission/popup-submission'
import TimeRemaining from '@shared/ui/time-remaining'
import { Typography, Space, Divider, Card, Button, Image } from 'antd'
import { useState } from 'react'

const { Title } = Typography

const TestNavigation = ({
  testData,
  currentQuestion,
  flatIndex,
  totalQuestions,
  isFlagged,
  onFlag,
  onQuestionChange,
  onNext,
  onSubmit,
  onAutoSubmit,
  userAnswers,
  flaggedQuestions,
  children
}) => {
  const [showAutoSubmitPopup, setShowAutoSubmitPopup] = useState(false)
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)

  const getAllQuestions = () => {
    if (!testData?.Parts) {
      return []
    }

    const allQuestions = []
    testData.Parts.forEach((part, partIndex) => {
      part.Questions.forEach(question => {
        allQuestions.push({
          partIndex,
          question,
          sequence: question.Sequence || 999
        })
      })
    })

    allQuestions.sort((a, b) => a.sequence - b.sequence)

    return allQuestions
  }

  const questionNavigatorValues = getAllQuestions().map((q, idx) => {
    const isQuestionFlagged = flaggedQuestions.includes(q.question.ID)

    let isQuestionAnswered = false
    if (q.question.Type === 'listening-questions-group' && q.question.GroupContent?.listContent) {
      isQuestionAnswered = q.question.GroupContent.listContent.every(subQuestion => {
        const subQuestionId = `${q.question.ID}-${subQuestion.ID}`
        return userAnswers[subQuestionId] !== undefined
      })
    } else {
      isQuestionAnswered = userAnswers[q.question.ID] !== undefined
    }

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

  const handleAutoSubmit = () => {
    setShowAutoSubmitPopup(true)
  }

  const handlePopupSubmit = () => {
    setShowAutoSubmitPopup(false)
    onAutoSubmit()
  }

  return (
    <div className="relative mx-auto min-h-screen w-1/2 p-5">
      <Space direction="vertical" className="w-full">
        <Divider orientation="left" className="!m-0">
          <Title level={1}>Listening</Title>
        </Divider>

        <Card className="mb-32">
          <div className="flex justify-between">
            <Title level={3} className="text-l mb-5 font-semibold">
              Question {flatIndex + 1} of {totalQuestions}
            </Title>

            <div className="flex items-end gap-2">
              <FlagButton key={currentQuestion?.ID} initialFlagged={isFlagged} onFlag={onFlag} />
            </div>
          </div>

          <div className="break-words">{children}</div>

          <div className="z-10 mt-8 flex justify-between">
            <div className="fixed bottom-8 left-4 z-20 hidden w-fit mdL:block">
              <Image src={navigateLogo} alt="Logo" preview={false} className="h-[100px] w-auto" />
            </div>
            <NavigationButtons
              totalQuestions={totalQuestions}
              currentQuestion={flatIndex}
              setCurrentQuestion={onQuestionChange}
              fetchQuestion={onNext}
              onSubmit={onSubmit}
            />
          </div>
        </Card>
      </Space>

      <div
        className={`fixed ${isNavigatorOpen ? 'bottom-[26.4%] sm:bottom-[42%]' : 'bottom-[51%]'} right-2 flex items-center gap-2 md:bottom-[48%] lg:bottom-[54%]`}
      >
        <Button
          className="rounded-full bg-blue-500 p-2 text-white shadow-lg md:hidden"
          onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
        >
          <MenuOutlined />
        </Button>
        <div
          className={`z-1 h-auto w-60 rounded-lg border bg-white p-2 shadow-lg ${isNavigatorOpen ? 'block' : 'hidden'} md:block`}
        >
          <TimeRemaining duration={40 * 60} onAutoSubmit={handleAutoSubmit} label="Time Remaining" />
          <QuestionNavigator values={questionNavigatorValues} action={onQuestionChange} position={flatIndex} />
        </div>
      </div>
      <PopupSubmission isOpen={showAutoSubmitPopup} type="timeout" onSubmit={handlePopupSubmit} />

      {showAutoSubmitPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Time&apos;s Up!</h3>
            <p>Your test will be automatically submitted.</p>
            <button onClick={handlePopupSubmit}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestNavigation
