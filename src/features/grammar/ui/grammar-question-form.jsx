import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import { Form, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text, Paragraph } = Typography

const formatDialogueContent = content => {
  if (!content) {
    return content
  }

  if (content.includes(':') && (content.includes('____') || content.includes('__'))) {
    const parts = content.split(/\s+(?=[A-Za-z]+:\s+)/)
    if (parts.length === 2) {
      const firstPart = parts[0].split(':')
      if (firstPart.length >= 2) {
        const speaker1 = firstPart[0]
        const text1 = firstPart.slice(1).join(':')

        const secondPart = parts[1].split(':')
        if (secondPart.length >= 2) {
          const speaker2 = secondPart[0]
          const text2 = secondPart.slice(1).join(':')

          return (
            <>
              <Paragraph className="mb-2.5 text-xl">
                <Text strong className="text-xl">
                  {speaker1}
                </Text>
                <Text className="text-xl">:{text1}</Text>
              </Paragraph>
              <Paragraph className="mb-0 text-xl">
                <Text strong className="text-xl">
                  {speaker2}
                </Text>
                <Text className="text-xl">:{text2}</Text>
              </Paragraph>
            </>
          )
        }
      }

      return (
        <>
          <Paragraph className="mb-2.5 text-xl">{parts[0]}</Paragraph>
          <Paragraph className="mb-0 text-xl">{parts[1]}</Paragraph>
        </>
      )
    }
  }

  return <Paragraph className="mb-0 text-xl">{content}</Paragraph>
}

// eslint-disable-next-line no-unused-vars
const QuestionForm = ({ currentPart, answers, setUserAnswer, onSubmit }) => {
  const [, setUserAnswerSubmit] = useState({})

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

  const questionContent =
    currentPart.Content || (currentPart.AnswerContent.title ? currentPart.AnswerContent.title : null)

  return (
    <Form layout="vertical">
      {currentPart.Type === 'matching' && (
        <div className="mb-6">
          <Paragraph className="mb-0 text-xl">{currentPart.Content}</Paragraph>
        </div>
      )}
      {currentPart.Type === 'multiple-choice' && <div className="mb-6">{formatDialogueContent(questionContent)}</div>}
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
            setUserAnswerSubmit={setUserAnswerSubmit}
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
