import { FlagOutlined, FlagFilled } from '@ant-design/icons'
import { Form, Input, Typography, Button } from 'antd'

const { Text, Title } = Typography

const QuestionForm = ({
  currentPart,
  partNumber,
  answers,
  flaggedParts,
  handleFlagToggle,
  handleTextChange,
  countWords,
  wordCounts,
  DEFAULT_MAX_WORDS
}) => {
  const handleTextAreaChange = (fieldName, value, maxWords) => {
    const wordCount = countWords(value || '')
    if (!maxWords || wordCount <= maxWords) {
      handleTextChange(fieldName, value)
    }
  }

  const handleKeyDown = (e, fieldName, maxWords) => {
    if (maxWords && wordCounts[fieldName] >= maxWords) {
      if (e.key === ' ' || e.keyCode === 32) {
        e.preventDefault()
      }
    }
  }
  return (
    <Form layout="vertical">
      <div className="mb-4 flex items-center justify-between">
        <Title level={4} className="font-semibold">
          {currentPart.Content}
        </Title>
        <Button
          icon={flaggedParts[currentPart.ID] ? <FlagFilled className="text-red-600" /> : <FlagOutlined />}
          className={`mx-auto flex h-10 items-center justify-center gap-2 rounded-md border px-4 transition-colors ${
            flaggedParts[currentPart.ID]
              ? 'border-red-300 bg-red-50 hover:border-red-400'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => handleFlagToggle(currentPart.ID)}
        >
          <span className={`text-base font-normal ${flaggedParts[currentPart.ID] ? 'text-red-600' : ''}`}>Flag</span>
        </Button>
      </div>

      {currentPart.Questions.map((question, index) => {
        const fieldName = `answer-${currentPart.ID}-${index}`
        const maxWords = partNumber === 1 ? null : question.maxWords || DEFAULT_MAX_WORDS[partNumber]

        return (
          <Form.Item key={index} label={<Text strong>{question.Content}</Text>}>
            <Input.TextArea
              rows={5}
              autoSize={{ minRows: 5, maxRows: 10 }}
              className="w-full"
              placeholder="Enter your answer here"
              value={answers[fieldName] || ''}
              onChange={e => handleTextAreaChange(fieldName, e.target.value, maxWords)}
              onKeyDown={e => handleKeyDown(e, fieldName, maxWords)}
              disabled={maxWords && wordCounts[fieldName] > maxWords}
            />
            {maxWords && (
              <Text
                className={`mt-1 block text-sm ${wordCounts[fieldName] === maxWords ? 'text-red-500' : 'text-gray-500'}`}
              >
                {`Word count: ${wordCounts[fieldName] || 0} / ${maxWords}`}
              </Text>
            )}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default QuestionForm
