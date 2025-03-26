import { Typography, Space, Row, Col } from 'antd'
import NavigationButtons from '@shared/ui/NavigationButtons/NavigationButtons'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import TimeRemaining from '@shared/ui/TimeRemaining/TimeRemaining'
import QuestionNavigator from '@shared/ui/QuestionNavigatior/QuestionNavigatior'
import PopupSubmission from '@shared/ui/Submission/PopupSubmission'
import { useState } from 'react'

const { Text } = Typography

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
    <div className="mx-auto max-w-7xl p-6 pb-20">
      <Row gutter={[24, 24]}>
        <Col span={4} />

        <Col span={14} className="w-full">
          <Space direction="vertical" size="large" className="mt-20 w-full">
            <Text strong className="text-4xl">
              {skillName}
            </Text>

            <div className="flex justify-between">
              <Text strong className="text-4xl">
                Question {flatIndex + 1} of {totalQuestions}
              </Text>

              <div className="flex items-end gap-2">
                <FlagButton key={currentQuestion?.ID} initialFlagged={isFlagged} onFlag={onFlag} />
              </div>
            </div>

            {children}

            <div className="mt-8 flex justify-between">
              <NavigationButtons
                totalQuestions={totalQuestions}
                currentQuestion={flatIndex}
                setCurrentQuestion={onQuestionChange}
                fetchQuestion={onNext}
                onSubmit={onSubmit}
              />
            </div>
          </Space>
        </Col>

        <Col span={6}>
          <div className="flex flex-col items-end">
            <TimeRemaining duration={40 * 60} onAutoSubmit={handleAutoSubmit} label="Time Remaining" />
          </div>
          <div className="mt-32">
            <QuestionNavigator values={questionNavigatorValues} action={onQuestionChange} position={flatIndex} />
          </div>
        </Col>
      </Row>

      <PopupSubmission isOpen={showAutoSubmitPopup} type="timeout" onSubmit={handlePopupSubmit} />
    </div>
  )
}

export default TestNavigation
