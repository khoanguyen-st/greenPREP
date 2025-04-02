import { matchingQuestionSchema } from '@shared/model/questionType/matching-question.schema'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

const { Option } = Select

const MatchingQuestion = ({ leftItems, rightItems, userAnswer = [], setUserAnswer, className = '' }) => {
  useEffect(() => {
    const validateData = async () => {
      try {
        await matchingQuestionSchema.validate({
          leftItems,
          rightItems,
          userAnswer
        })
      } catch (error) {
        console.error('Validation error:', error.message)
      }
    }

    validateData()
  }, [leftItems, rightItems])

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
    <div className={`mx-auto max-w-4xl rounded-lg bg-white p-6 ${className}`}>
      <div className="w-full space-y-4">
        {leftItems.map((leftItem, index) => (
          <div key={index} className="flex w-full items-start gap-6">
            <div className="min-w-[200px] flex-1">
              <p className="text-base text-gray-800">{leftItem}</p>
            </div>
            <div className="w-[300px] flex-shrink-0">
              <Select
                onChange={value => handleSelectChange(leftItem, value)}
                value={selectedOptions[leftItem] || ''}
                className="w-full"
                placeholder="Select an answer"
                showSearch
                filterOption={(input, option) => String(option.children).toLowerCase().includes(input.toLowerCase())}
              >
                {rightItems.map((rightItem, rightIndex) => (
                  <Option key={rightIndex} value={rightItem}>
                    {rightItem}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchingQuestion
