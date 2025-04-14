import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import { Form, Typography } from 'antd'
import { useEffect } from 'react'

const { Title } = Typography

// eslint-disable-next-line no-unused-vars
const QuestionForm = ({ currentPart, answers, setUserAnswer, onSubmit }) => {
  const handleAnswerSubmit = answer => {
    if (!currentPart) {
      return
    }
    const newAnswers = { ...answers, [currentPart.ID]: answer }
    setUserAnswer(newAnswers)
    localStorage.setItem('grammarAnswers', JSON.stringify(newAnswers))
  }

  const storedAnswers = JSON.parse(localStorage.getItem('grammarAnswers') || '{}')
  const userAnswer = storedAnswers[currentPart?.ID] || []

  useEffect(() => {
    localStorage.setItem('grammarAnswers', JSON.stringify(answers))
  }, [answers])

  if (!currentPart?.AnswerContent) {
    return null
  }

  return (
    <Form layout="vertical">
      {currentPart.Type === 'matching' && (
        <Title level={4} className="mb-6">
          {currentPart.Content}
        </Title>
      )}
      {currentPart.Type === 'multiple-choice' && (
        <Title level={4} className="mb-6">
          {currentPart.Content || currentPart.AnswerContent.title}
        </Title>
      )}
      <Form.Item
        key={`answer-${currentPart.ID}`}
        name={`answer-${currentPart.ID}`}
        initialValue={answers[`answer-${currentPart.ID}`] || ''}
      >
        {currentPart.Type === 'multiple-choice' ? (
          <MultipleChoice
            questionData={{
              ...currentPart,
              Content: '',
              AnswerContent: [
                {
                  title: currentPart.AnswerContent.title,
                  options: currentPart.AnswerContent.options,
                  correctAnswer: currentPart.AnswerContent.correctAnswer
                }
              ]
            }}
            userAnswer={answers}
            setUserAnswer={setUserAnswer}
            onSubmit={undefined}
          />
        ) : currentPart.Type === 'matching' ? (
          <MatchingQuestion
            leftItems={currentPart.AnswerContent.leftItems}
            rightItems={currentPart.AnswerContent.rightItems}
            userAnswer={userAnswer}
            setUserAnswer={handleAnswerSubmit}
          />
        ) : null}
      </Form.Item>
    </Form>
  )
}

export default QuestionForm
