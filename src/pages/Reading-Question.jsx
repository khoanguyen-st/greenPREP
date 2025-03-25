import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Select } from 'antd'

import TimeRemaining from '../shared/ui/TimeRemaining/TimeRemaining'

const { Option } = Select

// Function to fetch data from the API
const fetchTopic = async () => {
  const response = await axios.get(
    'https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=dropdown-list&skillName=READING'
  )
  return response.data
}

// Function to handle auto submit when time runs out
const handleAutoSubmit = () => {}

// Render fill-in-the-blank question
const renderFillInTheBlank = answerContent => {
  const { content, options } = answerContent
  const optionMap = options.reduce((acc, opt) => {
    acc[opt.key] = opt.value
    return acc
  }, {})

  // Regex to match placeholders like "1. (hot/ long/ cold)"
  const placeholderRegex = /(\d+)\.\s*\([^)]*\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = placeholderRegex.exec(content)) !== null) {
    const key = match[1]
    const startIndex = match.index
    const endIndex = placeholderRegex.lastIndex

    // Add text before the placeholder
    if (startIndex > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, startIndex) })
    }
    // Add dropdown for the placeholder
    parts.push({ type: 'dropdown', key })
    lastIndex = endIndex
  }
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) })
  }

  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.content}</span>
        } else if (part.type === 'dropdown') {
          const opts = optionMap[part.key]
          return (
            <Select key={index} defaultValue="" style={{ width: 120, margin: '0 8px' }} className="inline-block">
              <Option value="">Select</Option>
              {opts.map((opt, idx) => (
                <Option key={idx} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          )
        }
        return null
      })}
    </div>
  )
}

// Render matching question
const renderMatching = answerContent => {
  const { leftItems, rightItems } = answerContent
  return (
    <div>
      {leftItems.map((item, index) => (
        <div key={index} className="mb-2 flex items-center">
          <span className="mr-2">{item}</span>
          <Select defaultValue="" style={{ width: 120 }}>
            <Option value="">Select</Option>
            {rightItems.map((opt, idx) => (
              <Option key={idx} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  )
}

// Determine how to render each question based on its AnswerContent structure
const renderQuestion = question => {
  const { AnswerContent } = question
  if (AnswerContent.options) {
    // Fill-in-the-blank type
    return renderFillInTheBlank(AnswerContent)
  } else if (AnswerContent.leftItems && AnswerContent.rightItems) {
    // Matching type
    return (
      <div>
        <div className="mb-4 whitespace-pre-wrap">{AnswerContent.content}</div>
        {renderMatching(AnswerContent)}
      </div>
    )
  } else {
    return <div className="text-red-500">Unknown question type</div>
  }
}

// Main ReadingPage component
const ReadingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topic'],
    queryFn: fetchTopic
  })

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>
  }
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      {/* Timer */}
      <TimeRemaining duration={60 * 60} onAutoSubmit={handleAutoSubmit} />

      {/* Reading Content */}
      <h1 className="mb-4 text-2xl font-bold">{data.Name}</h1>
      {data.Parts.map(part => (
        <div key={part.ID} className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">{part.Content}</h2>
          {part.Questions.map(question => (
            <div key={question.ID} className="mt-4">
              {renderQuestion(question)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ReadingPage
