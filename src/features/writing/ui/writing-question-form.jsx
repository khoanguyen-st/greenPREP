import { Form, Input, Typography } from 'antd'

const { Text, Title } = Typography

const QuestionForm = ({
  currentPart,
  partNumber,
  answers,
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
        <Title level={4} className="text-justify">
          {currentPart.Content.replace(/^Part\s*\d+:\s*/i, '')
            .replace(/\(\d+(\.\d+)?\s*points?\)/i, '')
            .trim()}
        </Title>
      </div>

      {[...currentPart.Questions]
        .sort((a, b) => a.Sequence - b.Sequence)
        .map((question, index) => {
          const fieldName = `answer-${currentPart.ID}-${index}`
          const maxWords =
            question.maxWords ??
            (Array.isArray(DEFAULT_MAX_WORDS[partNumber])
              ? DEFAULT_MAX_WORDS[partNumber][index]
              : DEFAULT_MAX_WORDS[partNumber])

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
