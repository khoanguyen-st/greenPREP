import { Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import * as yup from 'yup'

import { answerContentSchema, dropdownQuestionSchema } from '../../model/questionType/dropdownQuestion.schema'

const { Option } = Select

const validationSchema = yup.object().shape({
  selectedOption: yup.string().required('Please select an answer')
})

const DropdownQuestion = ({ questionData, onChange, className = '', small = false }) => {
  dropdownQuestionSchema.validateSync(questionData)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [error, setError] = useState({})

  const processedData = useMemo(() => {
    if (!questionData) {
      return null
    }
    try {
      const parsedAnswerContent =
        typeof questionData.AnswerContent === 'string'
          ? JSON.parse(questionData.AnswerContent)
          : questionData.AnswerContent
      answerContentSchema.validateSync(parsedAnswerContent)

      if (parsedAnswerContent.leftItems && parsedAnswerContent.rightItems) {
        // Kiểu 2: right, left item
        return {
          id: questionData.ID,
          question: questionData.Content,
          leftItems: parsedAnswerContent.leftItems,
          rightItems: parsedAnswerContent.rightItems,
          correctAnswers: parsedAnswerContent.correctAnswer,
          type: 'right-left'
        }
      } else {
        // Kiểu 1: paragraph
        const options = parsedAnswerContent.options || []
        const answers = {}
        options.forEach(({ key, value }) => {
          answers[key] = value
        })
        const correctAnswers = {}
        ;(parsedAnswerContent.correctAnswer || []).forEach(({ key, value }) => {
          correctAnswers[key] = value
        })
        return {
          id: questionData.ID,
          question: questionData.Content,
          answers,
          correctAnswers,
          type: 'paragraph'
        }
      }
    } catch (error) {
      console.error('Error parsing question data:', error)
      return null
    }
  }, [questionData])

  useEffect(() => {
    if (processedData) {
      setSelectedOptions({})
      setError({})
    }
  }, [processedData])

  const handleSelectChange = async (key, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [key]: value
    }))
    try {
      await validationSchema.validate({ selectedOption: value })
      setError(prev => ({ ...prev, [key]: '' }))
      if (onChange) {
        onChange(processedData.id, key, value)
      }
    } catch (validationError) {
      setError(prev => ({ ...prev, [key]: validationError.message }))
    }
  }

  if (!processedData) {
    return <p className="text-center text-gray-600">No question data available.</p>
  }

  const isSingleQuestion = processedData.type === 'paragraph' && Object.keys(processedData.answers).length === 1

  return (
    <div className={`${className} mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg`}>
      <div
        className={`flex ${
          isSingleQuestion ? 'w-full items-center justify-center gap-4 text-wrap' : 'flex-col items-center'
        }`}
      >
        <p className="mb-4 whitespace-pre-wrap text-sm font-semibold text-gray-800">{processedData.question}</p>

        {processedData.type === 'paragraph' ? (
          // Kiểu 1: paragraph
          Object.entries(processedData.answers).map(([key, options]) => (
            <div key={key} className="mb-4 flex w-full">
              {Object.keys(processedData.answers).length > 1 && (
                <div className="h-7 w-7">
                  <p className="p-1 text-sm text-gray-700">{key}.</p>
                </div>
              )}

              <div className={`flex ${isSingleQuestion ? 'w-1/4 items-center' : 'w-1/2'}`}>
                <Select
                  onChange={value => handleSelectChange(key, value)}
                  value={selectedOptions[key]}
                  className={`w-2/3 ${small ? 'h-8 text-xs' : 'h-8 text-sm'} rounded-md border border-gray-300`}
                >
                  {options.map(option => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
              {error[key] && <p className="mt-2 text-xs text-red-500">{error[key]}</p>}
            </div>
          ))
        ) : (
          // Kiểu 2: right, left item
          <div className="w-full">
            {processedData.leftItems.map((leftItem, index) => (
              <div key={index} className="mb-4 flex w-full">
                <div className="w-1/2 pr-4">
                  <p className="p-1 text-xs text-gray-700">{leftItem}</p>
                </div>
                <div className="w-1/2">
                  <Select
                    onChange={value => handleSelectChange(leftItem, value)}
                    value={selectedOptions[leftItem]}
                    className={`w-2/3 ${small ? 'h-8 text-xs' : 'h-8 text-xs'} rounded-md border border-gray-300`}
                  >
                    {processedData.rightItems.map(rightItem => (
                      <Option key={rightItem} value={rightItem}>
                        {rightItem}
                      </Option>
                    ))}
                  </Select>
                </div>
                {error[leftItem] && <p className="mt-2 text-xs text-red-500">{error[leftItem]}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownQuestion
