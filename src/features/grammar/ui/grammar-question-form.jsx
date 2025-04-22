import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import { Form, Typography, Select, Row, Col } from 'antd'
import { useEffect, useState } from 'react'

const { Text, Paragraph } = Typography
const { Option } = Select

// Custom matching question component for questions 26 and 29 with equals sign format
const CustomMatchingQuestionEquals = ({ leftItems, rightItems, userAnswer = [], setUserAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    const newMatches = {}
    userAnswer.forEach(answer => {
      newMatches[answer.left] = answer.right
    })
    setSelectedOptions(newMatches)
  }, [userAnswer])

  const handleSelectChange = (leftItem, rightItem) => {
    const updatedMatches = { ...selectedOptions, [leftItem]: rightItem }
    setSelectedOptions(updatedMatches)

    const formattedAnswers = Object.entries(updatedMatches).map(([left, right]) => ({
      left,
      right
    }))
    setUserAnswer(formattedAnswers)
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white">
      <Row justify="center">
        <Col span={18}>
          <div className="w-full space-y-4 text-lg font-medium">
            {leftItems.map((leftItem, index) => (
              <Row key={index} className="matching-item" align="middle" justify="center">
                <Col span={7} style={{ textAlign: 'right' }}>
                  <Text className="text-lg">{leftItem}</Text>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                  <Text>=</Text>
                </Col>
                <Col span={10}>
                  <Select
                    onChange={value => handleSelectChange(leftItem, value)}
                    value={selectedOptions[leftItem] || ''}
                    className="w-full"
                    placeholder="Select an answer"
                    dropdownStyle={{ fontSize: '16px' }}
                    dropdownMatchSelectWidth={false}
                    optionLabelProp="label"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                  >
                    {rightItems.map((rightItem, rightIndex) => (
                      <Option
                        key={rightIndex}
                        value={rightItem}
                        label={rightItem}
                        style={{ fontSize: '16px', padding: '8px 12px' }}
                      >
                        {rightItem}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const CustomMatchingQuestionPlus = ({ leftItems, rightItems, userAnswer = [], setUserAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    const newMatches = {}
    userAnswer.forEach(answer => {
      newMatches[answer.left] = answer.right
    })
    setSelectedOptions(newMatches)
  }, [userAnswer])

  const handleSelectChange = (leftItem, rightItem) => {
    const updatedMatches = { ...selectedOptions, [leftItem]: rightItem }
    setSelectedOptions(updatedMatches)

    const formattedAnswers = Object.entries(updatedMatches).map(([left, right]) => ({
      left,
      right
    }))
    setUserAnswer(formattedAnswers)
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white">
      <Row justify="center">
        <Col span={18}>
          <div className="w-full space-y-4 text-lg font-medium">
            {leftItems.map((leftItem, index) => (
              <Row key={index} className="matching-item" align="middle" justify="center">
                <Col span={7} style={{ textAlign: 'right' }}>
                  <Text className="text-lg">{leftItem}</Text>
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}></Col>
                <Col span={10}>
                  <Select
                    onChange={value => handleSelectChange(leftItem, value)}
                    value={selectedOptions[leftItem] || ''}
                    className="w-full"
                    placeholder="Select an answer"
                    dropdownStyle={{ fontSize: '16px' }}
                    dropdownMatchSelectWidth={false}
                    optionLabelProp="label"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                  >
                    {rightItems.map((rightItem, rightIndex) => (
                      <Option
                        key={rightIndex}
                        value={rightItem}
                        label={rightItem}
                        style={{ fontSize: '16px', padding: '8px 12px' }}
                      >
                        {rightItem}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

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
const QuestionForm = ({ currentPart, answers, setUserAnswer, onSubmit, questionNumber = 0 }) => {
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

  // Check if this is question 26, 29 or 30
  const isQuestion26or29 = questionNumber === 26 || questionNumber === 29
  const isQuestion30 = questionNumber === 30

  return (
    <Form layout="vertical">
      {currentPart.Type === 'matching' && (
        <div className="mb-6">
          <Paragraph className="mb-0 text-xl font-semibold">{currentPart.Content}</Paragraph>
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
          isQuestion26or29 ? (
            <CustomMatchingQuestionEquals
              leftItems={currentPart.AnswerContent.leftItems}
              rightItems={currentPart.AnswerContent.rightItems}
              userAnswer={userAnswer}
              setUserAnswer={handleAnswerSubmit}
            />
          ) : isQuestion30 ? (
            <CustomMatchingQuestionPlus
              leftItems={currentPart.AnswerContent.leftItems}
              rightItems={currentPart.AnswerContent.rightItems}
              userAnswer={userAnswer}
              setUserAnswer={handleAnswerSubmit}
            />
          ) : (
            <MatchingQuestion
              leftItems={currentPart.AnswerContent.leftItems}
              rightItems={currentPart.AnswerContent.rightItems}
              userAnswer={userAnswer}
              setUserAnswer={handleAnswerSubmit}
            />
          )
        ) : null}
      </Form.Item>
    </Form>
  )
}

export default QuestionForm
