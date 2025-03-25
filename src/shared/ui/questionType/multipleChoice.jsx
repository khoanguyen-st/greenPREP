import { useState, useMemo } from 'react'
import { Typography } from 'antd'
import { multipleChoiceAnswerSchema } from '@shared/model/questionType/multipleQuestion.schemas'
const { Title, Text } = Typography

const MultipleChoice = ({ questionData, onSubmit, className = '' }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [error, setError] = useState(null)

  // Parse và validate AnswerContent với useMemo
  const { options, isValid } = useMemo(() => {
    try {
      const parsedContent = JSON.parse(questionData.AnswerContent)[0]
      // Validate với schema
      multipleChoiceAnswerSchema.validateSync(parsedContent)
      return { options: parsedContent.options, isValid: true }
    } catch (err) {
      setError(err.message)
      return { options: [], isValid: false }
    }
  }, [questionData.AnswerContent])

  const handleClick = optionValue => {
    setSelectedOption(optionValue)
    onSubmit(optionValue)
  }

  if (!isValid) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-500">
        <p>Lỗi dữ liệu: {error}</p>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <Title level={5} className="mb-6">
        {questionData.Content}
      </Title>
      <div className="space-y-3">
        {options.map(option => {
          const isSelected = selectedOption === option.value
          return (
            <div
              key={option.key}
              onClick={() => handleClick(option.value)}
              className={`flex h-[48px] w-full cursor-pointer rounded-md border transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-sm'
              } `}
            >
              <div
                className={`flex w-[48px] min-w-[48px] items-center justify-center rounded-l-md border-r ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-200 bg-gray-50 group-hover:bg-gray-100'
                } `}
              >
                <Text strong className="select-none text-base" style={{ color: isSelected ? 'white' : 'inherit' }}>
                  {option.key}
                </Text>
              </div>
              <div className="flex flex-1 items-center">
                <Text className="select-none px-5 text-base" style={{ color: isSelected ? '#1a56db' : '#374151' }}>
                  {option.value}
                </Text>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MultipleChoice
