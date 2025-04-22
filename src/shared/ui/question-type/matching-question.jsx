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
    <div className={`mx-auto max-w-5xl rounded-xl bg-white p-8 ${className}`}>
      <style>
        {`
          .ant-select-selection-item {
            font-size: 18px !important;
            line-height: 1.5 !important;
          }
          .matching-item {
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 16px;
            margin-bottom: 16px;
          }
          .matching-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
          }
        `}
      </style>
      <div className="w-full space-y-6">
        {leftItems.map((leftItem, index) => (
          <div key={index} className="matching-item flex w-full items-center gap-6">
            <div className="min-w-[250px] flex-1">
              <p className="text-lg font-medium leading-relaxed text-gray-700">{leftItem}</p>
            </div>
            <div className="w-[250px] flex-shrink-0">
              <Select
                onChange={value => handleSelectChange(leftItem, value)}
                value={selectedOptions[leftItem] || ''}
                className="h-9 w-full rounded-lg border border-gray-300 text-base shadow-sm"
                placeholder="Select an answer"
                dropdownStyle={{ fontSize: '16px' }}
                dropdownMatchSelectWidth={false}
                style={{ width: '100%' }}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchingQuestion
