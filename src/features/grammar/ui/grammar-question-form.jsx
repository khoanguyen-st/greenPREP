import { Form } from 'antd'
import FlagButton from '@shared/ui/FLagButton/FlagButton'
import MultipleChoice from '@shared/ui/questionType/multipleChoice'
import MatchingQuestion from '@shared/ui/questionType/MatchingQuestion'

const QuestionForm = ({ currentPart, answers, flaggedQuestions, handleFlagToggle, setUserAnswer, onSubmit }) => {
  const handleAnswerSubmit = answer => {
    if (!currentPart) {
      return
    }
    setUserAnswer({ ...answers, [currentPart.ID]: answer })
  }

  const storedAnswers = JSON.parse(localStorage.getItem('grammarAnswers') || '{}')
  const userAnswer = storedAnswers[currentPart.ID] || []

  return (
    <Form layout="vertical">
      {currentPart.AnswerContent.map(() => {
        const fieldName = `answer-${currentPart.ID}`
        return (
          <Form.Item
            key={fieldName}
            label={
              <FlagButton
                initialFlagged={flaggedQuestions[fieldName] || false}
                onFlag={() => handleFlagToggle(fieldName)}
              />
            }
            name={fieldName}
            initialValue={answers[fieldName] || ''}
          >
            {currentPart.Type === 'multiple-choice' ? (
              <MultipleChoice
                questionData={currentPart}
                userAnswer={answers}
                setUserAnswer={setUserAnswer}
                onSubmit={onSubmit}
              />
            ) : (
              <MatchingQuestion
                leftItems={currentPart.AnswerContent[0].leftItems.map((item, index) => ({
                  id: index + 1,
                  label: item
                }))}
                rightItems={currentPart.AnswerContent[0].rightItems.map((item, index) => ({
                  id: String.fromCharCode(97 + index),
                  label: item
                }))}
                userAnswer={userAnswer}
                setUserAnswer={handleAnswerSubmit}
              />
            )}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default QuestionForm
