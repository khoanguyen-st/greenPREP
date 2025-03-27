import { Typography, Space, Divider, Card, Button, Image } from 'antd'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import PopupSubmission from '@shared/ui/Submission/PopupSubmission'
import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { navigateLogo } from '@assets/images/navigateLogo.png'

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
  userAnswers,
  flaggedQuestions,
  skillName,
  children
}) => {
  const [showAutoSubmitPopup, setShowAutoSubmitPopup] = useState(false)
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)

  const getAllQuestions = () => {
    if (!testData?.Parts) {
      return []
    }

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

  const handleAutoSubmit = () => {
    setShowAutoSubmitPopup(true)
  }

  const handlePopupSubmit = () => {
    setShowAutoSubmitPopup(false)
    onSubmit()
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-4xl p-5">
      <Space direction="vertical" size="large" className="w-full">
        <Divider orientation="left">
          <Title level={1}>{skillName}</Title>
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

          {children}

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
        className={`fixed ${isNavigatorOpen ? 'bottom-[13%] sm:bottom-[30%]' : 'bottom-[50%]'} right-2 flex items-center gap-2 md:bottom-[43%] lg:bottom-[50%]`}
      >
        <Button
          className="rounded-full bg-blue-500 p-2 text-white shadow-lg md:hidden"
          onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
        >
          <MenuOutlined />
        </Button>
        <div
          className={`border-black-300 z-1 h-auto w-60 rounded-lg border bg-white p-2 shadow-lg ${isNavigatorOpen ? 'block' : 'hidden'} md:block`}
        >
          <TimeRemaining duration={40 * 60} onAutoSubmit={handleAutoSubmit} label="Time Remaining" />
          <QuestionNavigator values={questionNavigatorValues} action={onQuestionChange} position={flatIndex} />
        </div>
      </div>
      <PopupSubmission isOpen={showAutoSubmitPopup} type="timeout" onSubmit={handlePopupSubmit} />
    </div>
  )
}

export default TestNavigation
