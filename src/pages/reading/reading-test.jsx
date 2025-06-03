import ReadingSubmission from '@assets/images/submission/reading-submission.png'
import { fetchReadingTestDetails, submitStudentAnswers } from '@features/reading/api/readingAPI'
import FooterNavigator from '@features/reading/ui/reading-footer-navigator'
import QuestionNavigatorContainer from '@features/reading/ui/reading-question-navigator'
import FlagButton from '@shared/ui/flag-button'
import MatchingQuestion from '@shared/ui/question-type/matching-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import OrderingQuestion from '@shared/ui/question-type/ordering-question'
import NextScreen from '@shared/ui/submission/next-screen'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Typography, Card, Select, Divider } from 'antd'
import React, { useState, useEffect, useCallback } from 'react'

const { Option } = Select
const { Title, Text } = Typography

const getDefaultAnswerByType = type => {
  switch (type) {
    case 'dropdown-list':
      return {}
    case 'ordering':
    case 'matching':
      return []
    default:
      return ''
  }
}

const formatMatchingQuestion = question => ({
  leftItems: question.AnswerContent.leftItems,
  rightItems: question.AnswerContent.rightItems
})

const formatMultipleChoiceQuestion = question => ({
  ...question,
  AnswerContent:
    typeof question.AnswerContent === 'string' ? question.AnswerContent : JSON.stringify(question.AnswerContent)
})

const ReadingTest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const savedAnswers = localStorage.getItem('readingAnswers')
      return savedAnswers ? JSON.parse(savedAnswers) : {}
    } catch {
      return {}
    }
  })

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('flaggedQuestions'))
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })

  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isFlagged, setIsFlagged] = useState(false)
  const [partFlaggedStates, setPartFlaggedStates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('partFlaggedStates')) || {}
    } catch {
      return {}
    }
  })

  const {
    data: testData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchReadingTestDetails'],
    queryFn: fetchReadingTestDetails,
    staleTime: 6000
  })

  useEffect(() => {
    try {
      localStorage.setItem('readingAnswers', JSON.stringify(userAnswers))
    } catch (error) {
      console.error('Error saving answers:', error)
    }
  }, [userAnswers])

  useEffect(() => {
    localStorage.setItem('flaggedQuestions', JSON.stringify(flaggedQuestions))
  }, [flaggedQuestions])

  useEffect(() => {
    localStorage.setItem('partFlaggedStates', JSON.stringify(partFlaggedStates))
  }, [partFlaggedStates])

  useEffect(() => {
    if (testData?.Parts?.[currentPartIndex]) {
      setIsFlagged(Boolean(partFlaggedStates[currentPartIndex]))
    } else {
      setIsFlagged(false)
    }
  }, [currentPartIndex, partFlaggedStates, testData])

  const handleAnswerSubmit = answer => {
    if (!testData?.Parts?.[currentPartIndex]?.Questions?.[currentQuestionIndex]) {
      return
    }

    const currentQuestion = testData.Parts[currentPartIndex].Questions[currentQuestionIndex]

    if (typeof answer === 'function') {
      setUserAnswers(prev => {
        const newAnswers = answer(prev)
        return newAnswers
      })
      return
    }

    if (currentQuestion.Type === 'ordering' && typeof answer === 'object' && 'partIndex' in answer) {
      setUserAnswers(prev => ({
        ...prev,
        [answer.questionId]: {
          partIndex: answer.partIndex,
          answer: answer.answer
        }
      }))
      return
    }

    const formattedAnswer =
      currentQuestion.Type === 'dropdown-list'
        ? answer
        : typeof answer === 'object' && answer !== null
          ? answer
          : getDefaultAnswerByType(currentQuestion.Type)

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.ID]: formattedAnswer
    }))
  }

  const handlePartChange = newPartIndex => {
    const newPartFlagState = partFlaggedStates[newPartIndex] || false
    setIsFlagged(newPartFlagState)
    setCurrentPartIndex(newPartIndex)
    setCurrentQuestionIndex(0)
  }

  const handleFlagToggle = () => {
    const newIsFlagged = !isFlagged
    setIsFlagged(newIsFlagged)

    const currentQuestion = testData.Parts[currentPartIndex].Questions[currentQuestionIndex]

    setFlaggedQuestions(prev => {
      const newFlags = newIsFlagged ? [...prev, currentQuestion.ID] : prev.filter(id => id !== currentQuestion.ID)
      return newFlags
    })

    setPartFlaggedStates(prev => ({
      ...prev,
      [currentPartIndex]: newIsFlagged
    }))
  }

  const handleSubmit = useCallback(async () => {
    try {
      const globalData = JSON.parse(localStorage.getItem('globalData'))
      if (!globalData) {
        throw new Error('Global data not found')
      }

      const formattedAnswers = Object.entries(userAnswers).map(([questionId, answer]) => {
        const question = testData.Parts.flatMap(part => part.Questions).find(q => q.ID === questionId)

        const formattedAnswer = {
          questionId,
          answerText: null,
          answerAudio: null
        }

        switch (question?.Type) {
          case 'multiple-choice':
            formattedAnswer.answerText = answer
            break
          case 'matching':
            if (answer && typeof answer === 'object') {
              formattedAnswer.answerText = Object.entries(answer).map(([left, right]) => ({
                left,
                right
              }))
            }
            break
          case 'ordering':
            if (answer && typeof answer === 'object' && 'partIndex' in answer) {
              // const options = question.AnswerContent;
              formattedAnswer.answerText = answer.answer.map(item => ({
                key: item.key,
                value: item.value
              }))
            }
            break
          case 'dropdown-list':
            if (answer && typeof answer === 'object') {
              formattedAnswer.answerText = Object.entries(answer).map(([key, value]) => ({
                key,
                value
              }))
            }
            break
          case 'speaking':
            formattedAnswer.answerText = null
            formattedAnswer.answerAudio = answer
            break
          case 'writing':
            formattedAnswer.answerText = answer
            break
          default:
            formattedAnswer.answerText = answer
        }

        return formattedAnswer
      })

      const allQuestions = testData.Parts.flatMap(part => part.Questions)
      const answeredQuestionIds = new Set(formattedAnswers.map(answer => answer.questionId))

      const autoCompletedAnswers = allQuestions
        .filter(question => !answeredQuestionIds.has(question.ID))
        .map(question => ({
          questionId: question.ID,
          answerText: null,
          answerAudio: null
        }))

      const finalAnswers = [...formattedAnswers, ...autoCompletedAnswers]

      const submitData = {
        studentId: globalData.studentId,
        topicId: globalData.topicId,
        skillName: 'READING',
        sessionParticipantId: globalData.sessionParticipantId,
        sessionId: globalData.sessionId,
        questions: finalAnswers
      }

      await submitStudentAnswers(submitData)

      localStorage.removeItem('readingAnswers')
      localStorage.removeItem('flaggedQuestions')
      localStorage.removeItem('partFlaggedStates')

      setIsSubmitted(true)
      localStorage.setItem('current_skill', 'writing')
    } catch (error) {
      console.error('Error submitting answers:', error)
    }
  }, [userAnswers, testData])
  const handleForceSubmit = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  useEffect(() => {
    window.addEventListener('forceSubmit', handleForceSubmit)
    return () => {
      window.removeEventListener('forceSubmit', handleForceSubmit)
    }
  }, [handleForceSubmit])
  if (isSubmitted) {
    return <NextScreen nextPath="/writing" skillName="Reading" imageSrc={ReadingSubmission} />
  }

  if (isLoading) {
    return <Spin className="flex min-h-screen items-center justify-center" size="large" />
  }

  if (isError || !testData?.Parts?.length) {
    return (
      <Alert
        className="flex min-h-screen items-center justify-center"
        message="Error"
        description="Failed to load test data. Please try again."
        type="error"
        showIcon
      />
    )
  }

  const currentPart = testData.Parts[currentPartIndex]
  const sortedQuestions = (currentPart.Questions || []).sort((a, b) => a.Sequence - b.Sequence)
  const currentQuestion = sortedQuestions[currentQuestionIndex]
  const isLastPart = currentPartIndex === testData.Parts.length - 1

  const shouldShowContent = () => {
    const hasSlashFormat = currentQuestion.Content.includes('/') && currentQuestion.Content.split('/').length >= 2

    if (hasSlashFormat) {
      return false
    }

    if (currentQuestion.Type === 'matching') {
      return false
    }

    if (currentQuestion.Type === 'ordering') {
      return false
    }

    if (currentQuestion.Type === 'dropdown-list') {
      const answerContent =
        typeof currentQuestion.AnswerContent === 'string'
          ? JSON.parse(currentQuestion.AnswerContent)
          : currentQuestion.AnswerContent

      if (answerContent.leftItems && answerContent.rightItems) {
        return true
      }

      if (answerContent.options) {
        return false
      }
    }

    return true
  }

  const renderDropdownQuestion = () => {
    const processedData = (() => {
      try {
        const parsedAnswerContent =
          typeof currentQuestion.AnswerContent === 'string'
            ? JSON.parse(currentQuestion.AnswerContent)
            : currentQuestion.AnswerContent

        if (parsedAnswerContent.leftItems && parsedAnswerContent.rightItems) {
          return {
            id: currentQuestion.ID,
            question: currentQuestion.Content,
            leftItems: parsedAnswerContent.leftItems,
            rightItems: parsedAnswerContent.rightItems,
            type: 'right-left'
          }
        }

        if (parsedAnswerContent.options) {
          const options = parsedAnswerContent.options || []
          const answers = {}
          options.forEach(({ key, value }) => {
            answers[key] = value
          })
          return {
            id: currentQuestion.ID,
            question: currentQuestion.Content,
            answers,
            type: 'paragraph'
          }
        }

        return {
          id: currentQuestion.ID,
          question: currentQuestion.Content,
          answers: parsedAnswerContent,
          type: 'unknown'
        }
      } catch (error) {
        console.error('Error parsing question data:', error)
        return null
      }
    })()

    if (!processedData) {
      return <p className="text-center text-gray-600">No question data available.</p>
    }

    const answer = userAnswers[currentQuestion.ID] || {}

    if (currentQuestion.Type === 'matching' && processedData.type === 'right-left') {
      const contentLines = processedData.question.split('\n')
      const paragraphs = []
      let currentParagraph = ''

      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i]
        if (line.startsWith('Paragraph')) {
          const cleanedLine = line.replace(/^Paragraph\s*\d+\s*-\s*/, '').trim()
          if (currentParagraph) {
            paragraphs.push(currentParagraph)
          }
          currentParagraph = cleanedLine
        } else if (line.trim() && currentParagraph !== '') {
          currentParagraph += ' ' + line.trim()
        }
      }
      if (currentParagraph) {
        paragraphs.push(currentParagraph)
      }
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="mt-4 flex flex-col gap-8">
            {paragraphs.map((para, index) => (
              <div key={index + 1} className="mb-8">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{index + 1}.</span>
                    <Select
                      onChange={value => handleAnswerSubmit({ ...answer, [`Paragraph ${index + 1}`]: value })}
                      value={answer?.[`Paragraph ${index + 1}`] || ''}
                      className="w-80"
                      placeholder="Select a heading"
                      size="large"
                      style={{ fontSize: '16px' }}
                    >
                      {processedData.rightItems.map(rightItem => {
                        const displayText = rightItem.replace(/^[A-Z]\. /, '')
                        return (
                          <Option key={rightItem} value={rightItem} className="py-2 !text-base">
                            {displayText}
                          </Option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-justify text-base text-gray-800">
                  <span className="mr-2 font-semibold">Paragraph {index + 1} -</span>
                  {para}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (currentPartIndex === 0 && processedData.type === 'paragraph') {
      const cleanedQuestion = processedData.question.replace(/\s*\([^)]*\)/g, '')
      const hasSlashFormat = currentQuestion.Content.includes('/') && currentQuestion.Content.split('/').length >= 2
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="whitespace-pre-wrap text-base text-gray-800">
            {cleanedQuestion.split(/(\d+\.)/).map((part, index) => {
              if (part.match(/^\d+\.$/)) {
                const number = part.replace('.', '')
                if (number === '0') {
                  return part
                } else {
                  return (
                    <React.Fragment key={index}>
                      {hasSlashFormat ? '' : part}
                      <Select
                        onChange={value => handleAnswerSubmit({ ...answer, [number]: value })}
                        value={answer?.[number] || ''}
                        className="mx-2 my-2 inline-block"
                        size="large"
                        style={{ fontSize: '16px', minWidth: 100 }}
                        dropdownStyle={{ maxWidth: 'max-content' }}
                      >
                        {processedData.answers[number]?.map(option => {
                          const displayText = option.replace(/^[A-Z]\. /, '')
                          return (
                            <Option key={option} value={option} style={{ whiteSpace: 'normal' }} className="!text-base">
                              {displayText}
                            </Option>
                          )
                        })}
                      </Select>
                    </React.Fragment>
                  )
                }
              }
              return <span key={index}>{part}</span>
            })}
          </div>
        </div>
      )
    }

    if (processedData.type === 'right-left') {
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="mt-4">
            {processedData.leftItems.map((leftItem, index) => (
              <div key={index}>
                <div className="grid w-full grid-cols-[1fr,400px] items-center py-6">
                  <div className="border-r-2 border-gray-300 pr-8">
                    <span className="block whitespace-pre-wrap text-base text-gray-800">{leftItem}</span>
                  </div>
                  <div className="pl-8">
                    <Select
                      onChange={value => handleAnswerSubmit({ ...answer, [leftItem]: value })}
                      value={answer?.[leftItem] || ''}
                      className="w-full"
                      size="large"
                      style={{ fontSize: '16px' }}
                    >
                      {processedData.rightItems.map(rightItem => {
                        const displayText = rightItem.replace(/^[A-Z]\. /, '')
                        return (
                          <Option key={rightItem} value={rightItem} className="py-2 !text-base">
                            {displayText}
                          </Option>
                        )
                      })}
                    </Select>
                  </div>
                </div>
                {index < processedData.leftItems.length - 1 && <div className="h-[1px] bg-[#f0f0f0]" />}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (processedData.type === 'paragraph') {
      const cleanedQuestion = processedData.question.replace(/\s*\([^)]*\)/g, '')
      const hasSlashFormat = currentQuestion.Content.includes('/') && currentQuestion.Content.split('/').length >= 2
      return (
        <div className="mx-auto w-full max-w-4xl">
          <div className="whitespace-pre-wrap text-base text-gray-800">
            {cleanedQuestion.split(/(\d+\.)/).map((part, index) => {
              if (part.match(/^\d+\.$/)) {
                const number = part.replace('.', '')
                return (
                  <React.Fragment key={index}>
                    {hasSlashFormat ? '' : part}
                    <Select
                      onChange={value => handleAnswerSubmit({ ...answer, [number]: value })}
                      value={answer?.[number] || ''}
                      className="mx-2 inline-block w-32"
                      style={{ marginBottom: 10, fontSize: '16px' }}
                      size="large"
                    >
                      {processedData.answers[number]?.map(option => {
                        const displayText = option.replace(/^[A-Z]\. /, '')
                        return (
                          <Option key={option} value={option} className="py-2 !text-base">
                            {displayText}
                          </Option>
                        )
                      })}
                    </Select>
                  </React.Fragment>
                )
              }
              return <span key={index}>{part}</span>
            })}
          </div>
        </div>
      )
    }

    return (
      <div className="text-center text-red-600">
        Unsupported dropdown format. Please check the question configuration.
      </div>
    )
  }

  const renderQuestion = () => {
    if (!currentQuestion) {
      return null
    }

    const answer = (() => {
      const savedAnswer = userAnswers[currentQuestion.ID]

      if (currentQuestion.Type === 'ordering') {
        if (
          savedAnswer &&
          typeof savedAnswer === 'object' &&
          'partIndex' in savedAnswer &&
          savedAnswer.partIndex === currentPartIndex &&
          Array.isArray(savedAnswer.answer)
        ) {
          return savedAnswer.answer
        }
        return []
      }

      return savedAnswer || getDefaultAnswerByType(currentQuestion.Type)
    })()

    switch (currentQuestion.Type) {
      case 'dropdown-list': {
        return renderDropdownQuestion()
      }
      case 'ordering': {
        const options = (() => {
          try {
            if (Array.isArray(currentQuestion.AnswerContent)) {
              return currentQuestion.AnswerContent
            }
            if (typeof currentQuestion.AnswerContent === 'string') {
              const parsed = JSON.parse(currentQuestion.AnswerContent)
              return Array.isArray(parsed) ? parsed : parsed.options || []
            }
            return currentQuestion.AnswerContent.options || []
          } catch (e) {
            console.error('Error parsing ordering question options:', e)
            return []
          }
        })()
        return (
          <div className="mx-auto w-full max-w-4xl">
            <OrderingQuestion
              key={`ordering-${currentPartIndex}-${currentQuestion.ID}`}
              options={options}
              userAnswer={answer}
              setUserAnswer={newAnswer => {
                if (!Array.isArray(newAnswer)) {
                  console.error('Invalid answer format received from OrderingQuestion')
                  return
                }

                handleAnswerSubmit({
                  partIndex: currentPartIndex,
                  questionId: currentQuestion.ID,
                  answer: newAnswer
                })
              }}
              subcontent={currentPart.SubContent}
            />
          </div>
        )
      }
      case 'matching': {
        if (currentQuestion.Type === 'matching') {
          return renderDropdownQuestion()
        }
        return (
          <div className="mx-auto w-full max-w-4xl">
            <MatchingQuestion
              {...formatMatchingQuestion(currentQuestion)}
              userAnswer={answer}
              setUserAnswer={handleAnswerSubmit}
            />
          </div>
        )
      }
      case 'multiple-choice': {
        return (
          <div className="mx-auto w-full max-w-4xl">
            <MultipleChoice
              questionData={formatMultipleChoiceQuestion(currentQuestion)}
              userAnswer={answer}
              setUserAnswer={handleAnswerSubmit}
              onSubmit={handleAnswerSubmit}
              setUserAnswerSubmit={() => {}}
            />
          </div>
        )
      }
      default:
        return <div>Unsupported question type: {currentQuestion.Type}</div>
    }
  }

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-4xl p-5 pb-32">
      <Divider orientation="left">
        <Title level={1}>Reading</Title>
      </Divider>
      <Card className="mb-32">
        <div className="absolute right-4 top-4">
          <FlagButton key={`flag-button-${currentPartIndex}`} onFlag={handleFlagToggle} initialFlagged={isFlagged} />
        </div>
        <Title level={2} className="mb-6 text-3xl font-bold">
          {`Question ${currentPartIndex + 1} of 5`}
        </Title>
        <div className="prose prose-lg mb-8 max-w-none">
          <Text className="mb-2 block text-xl font-semibold text-gray-800">
            {currentPart.Content.startsWith('Part')
              ? (currentPart.Content.includes(':')
                  ? currentPart.Content.split(':')[1]
                  : currentPart.Content.split('-').slice(1).join(' ')
                )
                  .trim()
                  .split('\n')
                  .map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))
              : currentPart.Content.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
          </Text>
        </div>

        {shouldShowContent() && (
          <div className="prose prose-lg mb-8 whitespace-pre-wrap text-base text-gray-800">
            {currentPartIndex === 3
              ? currentQuestion.Content.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) {
                    return null
                  }
                  const formattedParagraph = paragraph.replace(/([A-Z][a-z]+):\s/g, '<strong>$1:</strong> ')
                  return (
                    <div key={index} className="mb-4">
                      <div dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
                    </div>
                  )
                })
              : currentQuestion.Content}
          </div>
        )}

        <div className="prose prose-lg flex max-w-none flex-col gap-4">{renderQuestion()}</div>
      </Card>

      <QuestionNavigatorContainer
        testData={testData}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        setCurrentPartIndex={handlePartChange}
        currentPartIndex={currentPartIndex}
        handleSubmit={handleSubmit}
      />

      <FooterNavigator
        totalParts={testData.Parts.length}
        currentPart={currentPartIndex}
        setCurrentPart={handlePartChange}
        handleSubmit={handleSubmit}
        isLastPart={isLastPart}
      />
    </div>
  )
}

export default ReadingTest
