import FlagButton from '@shared/ui/flag-button'
import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import { Form } from 'antd'
import { useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
const QuestionForm = ({ currentPart, answers, flaggedQuestions, handleFlagToggle, setUserAnswer, onSubmit }) => {
  const handleAnswerSubmit = answer => {
    if (!currentPart) {
      return
    }
    const newAnswers = { ...answers, [currentPart.ID]: answer }
    setUserAnswer(newAnswers)
    localStorage.setItem('grammarAnswers', JSON.stringify(newAnswers))
  }

  const storedAnswers = JSON.parse(localStorage.getItem('grammarAnswers') || '{}')
  const userAnswer = storedAnswers[currentPart.ID] || []

  useEffect(() => {
    localStorage.setItem('grammarAnswers', JSON.stringify(answers))
  }, [answers])

  if (!currentPart?.AnswerContent?.[0]) {
    return null
  }

  const formatMatchingQuestion = question => ({
    leftItems: question.AnswerContent[0].leftItems,
    rightItems: question.AnswerContent[0].rightItems
  })

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
                onSubmit={undefined} // onSubmit={onSubmit}
              />
            ) : (
              <MatchingQuestion
                {...formatMatchingQuestion(currentPart)}
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
