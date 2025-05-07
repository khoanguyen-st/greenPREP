import { multipleChoiceAnswerSchema } from '@shared/model/questionType/multipleQuestion.schemas'
import { Typography } from 'antd'
import { useState, useMemo } from 'react'
const { Text } = Typography

const MultipleChoice = ({ questionData, userAnswer, setUserAnswer, onSubmit, className = '', setUserAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [error, setError] = useState(null)
  const { options, isValid } = useMemo(() => {
    try {
      const parsedContent = Array.isArray(questionData.AnswerContent)
        ? questionData.AnswerContent[0]
        : JSON.parse(questionData.AnswerContent)[0]

      multipleChoiceAnswerSchema.validateSync(parsedContent)

      return { options: parsedContent.options, isValid: true }
    } catch (err) {
      setError(err.message)
      return { options: [], isValid: false }
    }
  }, [questionData.AnswerContent])
  useMemo(() => {
    if (userAnswer && userAnswer[questionData.ID]) {
      setSelectedOption(userAnswer[questionData.ID])
    }
  }, [userAnswer, questionData.ID])

  const handleClick = optionValue => {
    setSelectedOption(optionValue)
    setUserAnswer(prev => ({
      ...prev,
      [questionData.ID]: optionValue
    }))

    if (setUserAnswerSubmit) {
      const newAnswerSubmit = {
        questionId: questionData.ID,
        answerText: optionValue,
        answerAudio: null
      }
      setUserAnswerSubmit(prev => ({
        ...prev,
        [questionData.ID]: newAnswerSubmit
      }))
    }

    onSubmit?.(optionValue)
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
      <div className="space-y-4">
        {options.map(option => {
          const isSelected = selectedOption === option.value
          return (
            <div
              key={option.key}
              onClick={() => handleClick(option.value)}
              className={`flex h-[64px] w-full cursor-pointer rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-[#003087] bg-[#003087]/5 shadow-[0_8px_16px_rgba(0,48,135,0.15)]'
                  : 'border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:border-[#003087] hover:bg-[#003087]/5 hover:shadow-[0_4px_12px_rgba(0,48,135,0.1)]'
              } `}
            >
              <div
                className={`flex w-[64px] min-w-[64px] items-center justify-center rounded-l-xl border-r ${
                  isSelected
                    ? 'border-[#003087] bg-[#003087] text-white'
                    : 'border-gray-200 bg-gray-50 group-hover:bg-gray-100'
                } `}
              >
                <Text strong className="select-none text-lg" style={{ color: isSelected ? 'white' : 'inherit' }}>
                  {option.key}
                </Text>
              </div>
              <div className="flex flex-1 items-center">
                <Text
                  className="select-none px-6 font-medium"
                  style={{
                    color: isSelected ? '#003087' : '#374151',
                    lineHeight: '1.5',
                    fontSize: '16px'
                  }}
                >
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
