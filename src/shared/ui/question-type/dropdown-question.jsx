import { answerContentSchema, dropdownQuestionSchema } from '@shared/model/questionType/dropdownQuestion.schema'
import { Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import * as yup from 'yup'

const { Option } = Select

const validationSchema = yup.object().shape({
  selectedOption: yup.string().required('Please select an answer')
})

const DropdownQuestion = ({ questionData, userAnswer, setUserAnswer, className = '', small = false }) => {
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
        return {
          id: questionData.ID,
          question: questionData.Content,
          leftItems: parsedAnswerContent.leftItems,
          rightItems: parsedAnswerContent.rightItems,
          correctAnswers: parsedAnswerContent.correctAnswer,
          type: 'right-left'
        }
      } else {
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

  const memoizedProcessedData = useMemo(() => processedData, [processedData])
  useEffect(() => {
    if (!memoizedProcessedData) {
      return
    }

    const currentUserAnswer = userAnswer[memoizedProcessedData.id] || {}
    if (currentUserAnswer.answerText && Array.isArray(currentUserAnswer.answerText)) {
      const extractedOptions = {}
      currentUserAnswer.answerText.forEach(item => {
        if (
          item.key &&
          item.value &&
          item.key !== 'questionId' &&
          item.key !== 'answerText' &&
          item.key !== 'answerAudio'
        ) {
          extractedOptions[item.key] = item.value
        }
      })
      setSelectedOptions(extractedOptions)
    } else {
      setSelectedOptions({})
    }

    setError({})
  }, [memoizedProcessedData, userAnswer])

  const handleSelectChange = async (key, value) => {
    const updatedAnswers = { ...selectedOptions }

    Object.keys(updatedAnswers).forEach(k => {
      if (k === 'questionId' || k === 'answerText' || k === 'answerAudio') {
        delete updatedAnswers[k]
      }
    })

    updatedAnswers[key] = value
    setSelectedOptions(updatedAnswers)

    try {
      await validationSchema.validate({ selectedOption: value })
      setError(prev => ({ ...prev, [key]: '' }))

      const answerText = Object.entries(updatedAnswers).map(([k, v]) => ({
        key: k,
        value: v
      }))
      setUserAnswer(prev => ({
        ...prev,
        [processedData.id]: {
          questionId: processedData.id,
          answerText: answerText,
          answerAudio: null
        }
      }))
    } catch (validationError) {
      setError(prev => ({ ...prev, [key]: validationError.message }))
    }
  }
  if (!processedData) {
    return <p className="text-center text-gray-600">No question data available.</p>
  }
  return (
    <div className={`${className} mx-auto max-w-5xl rounded-xl bg-white p-8`}>
      <style>
        {`
          .ant-select-selection-item {
            font-size: 15px !important;
            line-height: 1.5 !important;
          }
          .dropdown-item {
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 16px;
            margin-bottom: 16px;
          }
          .dropdown-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
            margin-bottom: 0;
          }
        `}
      </style>
      <p className="mb-6 whitespace-pre-wrap text-[15px] font-semibold leading-relaxed text-gray-800">
        {processedData.question}
      </p>
      {processedData.type === 'paragraph' ? (
        Object.entries(processedData.answers).map(([key, options]) => (
          <div key={key} className="dropdown-item flex w-full">
            <div className={`flex w-1/2`}>
              <Select
                onChange={value => handleSelectChange(key, value)}
                value={selectedOptions?.[key] || ''}
                className={`w-2/3 ${small ? 'h-10' : 'h-12'} rounded-lg border border-gray-300 text-[15px] shadow-sm`}
                dropdownStyle={{ fontSize: '15px' }}
              >
                {options.map(option => (
                  <Option key={option} value={option} style={{ fontSize: '15px', padding: '8px 12px' }}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
            {error[key] && <p className="mt-2 text-[15px] text-red-500">{error[key]}</p>}
          </div>
        ))
      ) : (
        <div className="w-full space-y-6">
          {processedData.leftItems.map((leftItem, index) => (
            <div key={index} className="dropdown-item flex w-full items-start gap-6">
              <div className="min-w-[250px] flex-1">
                <p className="text-[15px] font-medium leading-relaxed text-gray-700">{leftItem}</p>
              </div>
              <div className="w-[350px] flex-shrink-0">
                <Select
                  onChange={value => handleSelectChange(leftItem, value)}
                  value={selectedOptions[leftItem] || ''}
                  className={`w-full ${small ? 'h-10' : 'h-12'} rounded-lg border border-gray-300 text-[15px] shadow-sm`}
                  placeholder="Select an answer"
                  dropdownStyle={{ fontSize: '15px' }}
                  dropdownMatchSelectWidth={false}
                  style={{ width: '100%' }}
                  optionLabelProp="label"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {processedData.rightItems.map(rightItem => (
                    <Option
                      key={rightItem}
                      value={rightItem}
                      label={rightItem}
                      style={{ fontSize: '15px', padding: '8px 12px' }}
                    >
                      {rightItem}
                    </Option>
                  ))}
                </Select>
              </div>
              {error[leftItem] && <p className="mt-2 text-[15px] text-red-500">{error[leftItem]}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default DropdownQuestion
