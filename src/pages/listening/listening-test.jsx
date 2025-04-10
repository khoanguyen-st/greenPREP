import { SubmissionImage } from '@assets/images'
import { fetchListeningTestDetails, saveListeningAnswers } from '@features/listening/api/listeningAPI'
import PlayStopButton from '@features/listening/ui/play-stop-button'
import TestNavigation from '@features/listening/ui/test-navigation'
import DropdownQuestion from '@shared/ui/question-type/dropdown-question'
import MultipleChoice from '@shared/ui/question-type/multiple-choice'
import NextScreen from '@shared/ui/submission/next-screen'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Typography } from 'antd'
import { useState, useMemo, useEffect } from 'react'

const STORAGE_KEY = 'listening_test_answers'

const ListeningTest = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY)
    return savedAnswers ? JSON.parse(savedAnswers) : {}
  })
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add new state for the formatted answers
  const [formattedAnswers, setFormattedAnswers] = useState(() => {
    const savedFormattedAnswers = localStorage.getItem('listening_formatted_answers')
    return savedFormattedAnswers
      ? JSON.parse(savedFormattedAnswers)
      : {
          studentId: '661abc8e-55a0-4d95-89e4-784acd81227d',
          topicId: 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
          skillName: 'LISTENING',
          sessionParticipantId: 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
          questions: []
        }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userAnswers))
  }, [userAnswers])

  useEffect(() => {
    localStorage.setItem('listening_formatted_answers', JSON.stringify(formattedAnswers))
  }, [formattedAnswers])

  const {
    data: testData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['listeningTest'],
    queryFn: () => fetchListeningTestDetails()
  })

  // Add a new useEffect to sync userAnswers with formattedAnswers for dropdown-list questions
  useEffect(() => {
    // Find dropdown-list questions in userAnswers that aren't in formattedAnswers
    const dropdownListQuestions = Object.entries(userAnswers).filter(([id, answer]) => {
      // Check if it's a dropdown-list question (object with multiple key-value pairs)
      const isDropdownList = typeof answer === 'object' && !Array.isArray(answer) && Object.keys(answer).length > 0

      // Check if it's already in formattedAnswers
      const isInFormattedAnswers = formattedAnswers.questions.some(q => q.questionId === id)

      return isDropdownList && !isInFormattedAnswers
    })

    if (dropdownListQuestions.length > 0) {
      // Update formattedAnswers with the missing dropdown-list questions
      setFormattedAnswers(prev => {
        const newQuestions = [...prev.questions]

        dropdownListQuestions.forEach(([id, answer]) => {
          // Find the question in test data to get its content
          let questionContent = null
          if (testData?.Parts) {
            for (const part of testData.Parts) {
              for (const q of part.Questions) {
                if (q.ID === id) {
                  questionContent = q.Content
                  break
                }
              }
              if (questionContent) {
                break
              }
            }
          }

          // Convert the answer object to the required format, filtering out the question content
          const formattedAnswer = Object.entries(answer)
            .filter(([key]) => key !== questionContent) // Filter out the question content
            .map(([key, value]) => ({
              key,
              value
            }))

          // Add the question to formattedAnswers
          newQuestions.push({
            questionId: id,
            answerAudio: null,
            answerText: formattedAnswer
          })
        })

        return {
          ...prev,
          questions: newQuestions
        }
      })
    }

    // Also check for existing dropdown-list questions that need to be updated
    const existingDropdownListQuestions = formattedAnswers.questions.filter(q => {
      // Check if it's a dropdown-list question in userAnswers
      const userAnswer = userAnswers[q.questionId]
      return userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)
    })

    if (existingDropdownListQuestions.length > 0) {
      // Update the existing dropdown-list questions
      setFormattedAnswers(prev => {
        const newQuestions = [...prev.questions]

        existingDropdownListQuestions.forEach(q => {
          const userAnswer = userAnswers[q.questionId]

          // Find the index of this question in the newQuestions array
          const questionIndex = newQuestions.findIndex(nq => nq.questionId === q.questionId)

          if (questionIndex >= 0) {
            // Get the existing answerText array or create a new one
            const existingAnswerText = newQuestions[questionIndex].answerText || []

            // Create a map of existing answers for easy lookup
            const existingAnswersMap = {}
            if (Array.isArray(existingAnswerText)) {
              existingAnswerText.forEach(item => {
                if (item.key) {
                  existingAnswersMap[item.key] = item.value
                }
              })
            }

            // Find the question in test data to get its content
            let questionContent = null
            if (testData?.Parts) {
              for (const part of testData.Parts) {
                for (const q of part.Questions) {
                  if (q.ID === q.questionId) {
                    questionContent = q.Content
                    break
                  }
                }
                if (questionContent) {
                  break
                }
              }
            }

            // Merge the existing answers with the new answers from userAnswer
            const mergedAnswers = { ...existingAnswersMap }
            Object.entries(userAnswer).forEach(([key, value]) => {
              // Skip the question content
              if (key !== questionContent) {
                mergedAnswers[key] = value
              }
            })

            // Convert the merged answers to the required format
            const formattedAnswer = Object.entries(mergedAnswers).map(([key, value]) => ({
              key,
              value
            }))

            // Update the question in formattedAnswers
            newQuestions[questionIndex] = {
              ...newQuestions[questionIndex],
              answerText: formattedAnswer
            }
          }
        })

        return {
          ...prev,
          questions: newQuestions
        }
      })
    }
  }, [userAnswers, formattedAnswers.questions, testData])

  // Add a new useEffect to sync userAnswers with formattedAnswers for listening-questions-group
  useEffect(() => {
    if (!testData?.Parts) {
      return
    }

    // Find listening-questions-group questions in userAnswers that need to be synced
    const listeningGroupQuestions = []

    // First, find all listening-questions-group questions in the test data
    testData.Parts.forEach(part => {
      part.Questions.forEach(question => {
        if (question.Type === 'listening-questions-group' && question.GroupContent?.listContent) {
          const parentId = question.ID

          // Check if all sub-questions are answered in userAnswers
          const allSubQuestionsAnswered = question.GroupContent.listContent.every(subQuestion => {
            const subQuestionId = `${parentId}-${subQuestion.ID}`
            return userAnswers[subQuestionId] !== undefined
          })

          if (allSubQuestionsAnswered) {
            listeningGroupQuestions.push({
              parentId,
              subQuestions: question.GroupContent.listContent.map(subQuestion => ({
                id: subQuestion.ID,
                answer: userAnswers[`${parentId}-${subQuestion.ID}`]
              }))
            })
          }
        }
      })
    })

    if (listeningGroupQuestions.length > 0) {
      // Update formattedAnswers with the listening-questions-group questions
      setFormattedAnswers(prev => {
        const newQuestions = [...prev.questions]

        listeningGroupQuestions.forEach(group => {
          // Check if the question already exists in formattedAnswers
          const existingQuestionIndex = newQuestions.findIndex(q => q.questionId === group.parentId)

          if (existingQuestionIndex >= 0) {
            // Update existing question
            const existingAnswer = newQuestions[existingQuestionIndex].answerText || []

            // Make sure existingAnswer is an array
            if (!Array.isArray(existingAnswer)) {
              newQuestions[existingQuestionIndex].answerText = group.subQuestions.map(q => ({
                ID: q.id,
                answer: q.answer
              }))
            } else {
              // Create a new array with only the correct sub-question IDs
              const validSubQuestionIds = group.subQuestions.map(q => q.id)

              // Filter out any answers with incorrect IDs
              const filteredAnswers = existingAnswer.filter(a => validSubQuestionIds.includes(a.ID))

              // Merge filtered answers with new answers
              const mergedAnswers = [...filteredAnswers]

              group.subQuestions.forEach(subQuestion => {
                const subQuestionIndex = mergedAnswers.findIndex(a => a.ID === subQuestion.id)

                if (subQuestionIndex >= 0) {
                  // Update existing sub-question
                  mergedAnswers[subQuestionIndex].answer = subQuestion.answer
                } else {
                  // Add new sub-question
                  mergedAnswers.push({
                    ID: subQuestion.id,
                    answer: subQuestion.answer
                  })
                }
              })

              // Sort the answers by ID to maintain order
              mergedAnswers.sort((a, b) => a.ID - b.ID)

              newQuestions[existingQuestionIndex].answerText = mergedAnswers
            }
          } else {
            // Add new question
            newQuestions.push({
              questionId: group.parentId,
              answerAudio: null,
              answerText: group.subQuestions.map(q => ({
                ID: q.id,
                answer: q.answer
              }))
            })
          }
        })

        return {
          ...prev,
          questions: newQuestions
        }
      })
    }
  }, [userAnswers, testData])

  const groupedQuestions = useMemo(() => {
    if (!testData?.Parts) {
      return []
    }

    const groups = {}
    testData.Parts.forEach(part => {
      part.Questions.forEach(question => {
        if (!groups[question.AudioKeys]) {
          groups[question.AudioKeys] = {
            audioUrl: question.AudioKeys,
            questions: [],
            partIndex: testData.Parts.indexOf(part)
          }
        }
        groups[question.AudioKeys].questions.push(question)
      })
    })
    return Object.values(groups)
  }, [testData])

  const getTotalQuestions = () => {
    if (!groupedQuestions.length) {
      return 0
    }
    return groupedQuestions.length
  }

  const getCurrentGroup = () => {
    if (!groupedQuestions.length) {
      return null
    }
    return groupedQuestions[currentPartIndex] || null
  }

  const getCurrentQuestion = () => {
    const group = getCurrentGroup()
    if (!group) {
      return null
    }
    return group.questions[currentQuestionIndex] || null
  }

  const getCurrentFlatIndex = () => {
    if (!groupedQuestions.length) {
      return 0
    }
    return currentPartIndex
  }

  const goToNext = () => {
    if (isAudioPlaying) {
      return
    }

    const currentGroup = getCurrentGroup()
    if (!currentGroup) {
      return
    }

    if (currentQuestionIndex < currentGroup.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentPartIndex < groupedQuestions.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToQuestion = flatIndex => {
    if (isAudioPlaying) {
      return
    }

    if (!groupedQuestions.length) {
      return
    }

    setCurrentPartIndex(flatIndex)
    setCurrentQuestionIndex(0)
  }

  const handleAnswerSubmit = (questionId, answer) => {
    // Update the old format for backward compatibility
    setUserAnswers(prev => {
      // For dropdown-list questions, we need to merge the new answer with existing answers
      if (typeof answer === 'object' && !Array.isArray(answer)) {
        // This is a dropdown-list question
        const existingAnswer = prev[questionId] || {}
        const newAnswers = {
          ...prev,
          [questionId]: {
            ...existingAnswer,
            ...answer
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers))
        return newAnswers
      } else {
        // This is a regular question
        const newAnswers = {
          ...prev,
          [questionId]: answer
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers))
        return newAnswers
      }
    })

    // Update the new formatted answers
    setFormattedAnswers(prev => {
      // Check if this is a sub-question from a listening-questions-group
      const isSubQuestion = questionId.includes('-')
      let parentQuestionId = questionId
      let subQuestionId = null

      if (isSubQuestion) {
        const parts = questionId.split('-')
        parentQuestionId = parts[0]
        subQuestionId = parts[1]
      }

      // Find the question in the test data
      let question = null
      let questionType = null
      let fullQuestionId = parentQuestionId

      if (testData?.Parts) {
        for (const part of testData.Parts) {
          for (const q of part.Questions) {
            // Check if the question ID starts with the parent ID
            if (q.ID.startsWith(parentQuestionId)) {
              question = q
              questionType = q.Type
              fullQuestionId = q.ID // Use the full question ID from the test data
              break
            }
          }
          if (question) {
            break
          }
        }
      }

      // Special handling for dropdown-list questions that might not be found in test data
      // This is for cases where the question ID exists in userAnswers but not in testData
      if (!question && userAnswers[questionId] && typeof userAnswers[questionId] === 'object') {
        // This is likely a dropdown-list question
        questionType = 'dropdown-list'
        fullQuestionId = questionId
      }

      // Create the new questions array
      const newQuestions = [...prev.questions]

      // Check if the question already exists in the formatted answers
      const existingQuestionIndex = newQuestions.findIndex(q => q.questionId === fullQuestionId)

      if (existingQuestionIndex >= 0) {
        // Update existing question
        if (questionType === 'listening-questions-group' && subQuestionId) {
          // For listening-questions-group, update the specific sub-question
          let existingAnswer = newQuestions[existingQuestionIndex].answerText || []

          // Make sure existingAnswer is an array
          if (!Array.isArray(existingAnswer)) {
            existingAnswer = []
          }

          // Find if the sub-question already exists
          const subQuestionIndex = existingAnswer.findIndex(a => a.ID === parseInt(subQuestionId))

          if (subQuestionIndex >= 0) {
            // Update existing sub-question
            existingAnswer[subQuestionIndex] = {
              ID: parseInt(subQuestionId),
              answer: answer
            }
          } else {
            // Add new sub-question
            existingAnswer.push({
              ID: parseInt(subQuestionId),
              answer: answer
            })
          }

          // Sort the answers by ID to maintain order
          existingAnswer.sort((a, b) => a.ID - b.ID)

          newQuestions[existingQuestionIndex].answerText = existingAnswer
        } else if (questionType === 'dropdown-list') {
          // For dropdown-list, update the specific key-value pair
          const existingAnswer = newQuestions[existingQuestionIndex].answerText || []

          // Check if answerText is already an array
          if (Array.isArray(existingAnswer)) {
            // For dropdown-list, we need to handle the answer differently
            // The answer is an object with a single key-value pair
            const answerKey = Object.keys(answer)[0]
            const answerValue = answer[answerKey]

            // Check if this is a question content key (like "Four people are talking about...")
            // We should skip these keys as they're not actual question-answer pairs
            if (answerKey === question?.Content) {
              // Skip this key, it's the question content
              return {
                ...prev,
                questions: newQuestions
              }
            }

            // Find if the key already exists
            const keyIndex = existingAnswer.findIndex(a => a.key === answerKey)

            if (keyIndex >= 0) {
              // Update existing key
              existingAnswer[keyIndex].value = answerValue
            } else {
              // Add new key-value pair
              existingAnswer.push({
                key: answerKey,
                value: answerValue
              })
            }
          } else {
            // Convert to array format if it's not already
            // For dropdown-list, we need to handle the answer differently
            const answerKey = Object.keys(answer)[0]
            const answerValue = answer[answerKey]

            // Check if this is a question content key (like "Four people are talking about...")
            // We should skip these keys as they're not actual question-answer pairs
            if (answerKey === question?.Content) {
              // Skip this key, it's the question content
              return {
                ...prev,
                questions: newQuestions
              }
            }

            newQuestions[existingQuestionIndex].answerText = [
              {
                key: answerKey,
                value: answerValue
              }
            ]
          }
        } else if (questionType === 'matching') {
          // For matching, update the specific left-right pair
          const existingAnswer = newQuestions[existingQuestionIndex].answerText || []

          // Check if answerText is already an array
          if (Array.isArray(existingAnswer)) {
            // Find if the left item already exists
            const leftIndex = existingAnswer.findIndex(a => a.left === (question?.Content || questionId))

            if (leftIndex >= 0) {
              // Update existing left-right pair
              existingAnswer[leftIndex].right = answer
            } else {
              // Add new left-right pair
              existingAnswer.push({
                left: question?.Content || questionId,
                right: answer
              })
            }
          } else {
            // Convert to array format if it's not already
            newQuestions[existingQuestionIndex].answerText = [
              {
                left: question?.Content || questionId,
                right: answer
              }
            ]
          }
        } else {
          // For multiple-choice, just update the answer
          newQuestions[existingQuestionIndex].answerText = answer
        }
      } else {
        // Add new question
        const newQuestion = {
          questionId: fullQuestionId, // Use the full question ID from the test data
          answerAudio: null
        }

        if (questionType === 'listening-questions-group' && subQuestionId) {
          // For listening-questions-group, add the sub-question
          newQuestion.answerText = [
            {
              ID: parseInt(subQuestionId),
              answer: answer
            }
          ]
        } else if (questionType === 'dropdown-list') {
          // For dropdown-list, add the key-value pair
          // The answer is an object with a single key-value pair
          const answerKey = Object.keys(answer)[0]
          const answerValue = answer[answerKey]

          // Check if this is a question content key (like "Four people are talking about...")
          // We should skip these keys as they're not actual question-answer pairs
          if (answerKey === question?.Content) {
            // Skip this key, it's the question content
            return {
              ...prev,
              questions: newQuestions
            }
          }

          newQuestion.answerText = [
            {
              key: answerKey,
              value: answerValue
            }
          ]
        } else if (questionType === 'matching') {
          // For matching, add the left-right pair
          newQuestion.answerText = [
            {
              left: question?.Content || questionId,
              right: answer
            }
          ]
        } else {
          // For multiple-choice, just add the answer
          newQuestion.answerText = answer
        }

        newQuestions.push(newQuestion)
      }

      return {
        ...prev,
        questions: newQuestions
      }
    })
  }

  const handleSubmit = async () => {
    try {
      // Save the formatted answers to the database
      await saveListeningAnswers(formattedAnswers)

      // Save the formatted answers to localStorage before clearing
      localStorage.setItem('listening_formatted_answers', JSON.stringify(formattedAnswers))

      // Clear the old format
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('listening_test_answers')
      localStorage.removeItem('listening_formatted_answers')

      // Reset the state
      setUserAnswers({})
      setFormattedAnswers({
        studentId: '661abc8e-55a0-4d95-89e4-784acd81227d',
        topicId: 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
        skillName: 'LISTENING',
        sessionParticipantId: 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
        questions: []
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting listening test:', error)
      // You might want to show an error message to the user here
    }
  }

  // Handle auto-submit when time runs out
  const handleAutoSubmit = async () => {
    try {
      // Save the formatted answers to the database
      await saveListeningAnswers(formattedAnswers)

      // Save the formatted answers to localStorage before clearing
      localStorage.setItem('listening_formatted_answers', JSON.stringify(formattedAnswers))

      // Clear the old format
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('listening_test_answers')
      localStorage.removeItem('listening_formatted_answers')

      // Reset the state
      setUserAnswers({})
      setFormattedAnswers({
        studentId: '661abc8e-55a0-4d95-89e4-784acd81227d',
        topicId: 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
        skillName: 'LISTENING',
        sessionParticipantId: 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
        questions: []
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error auto-submitting listening test:', error)
      // You might want to show an error message to the user here
    }
  }

  const toggleFlag = isFlagged => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) {
      return
    }

    if (isFlagged) {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.ID])
    } else {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== currentQuestion.ID))
    }
  }

  const formatQuestionData = question => {
    if (!question) {
      return null
    }

    try {
      const answerContent =
        typeof question.AnswerContent === 'string' ? JSON.parse(question.AnswerContent) : question.AnswerContent

      if (question.Type === 'listening-questions-group' && question.GroupContent?.listContent) {
        // Handle listening-questions-group type
        const formattedQuestions = question.GroupContent.listContent.map(subQuestion => {
          const options = subQuestion.options.map((option, index) => ({
            key: String.fromCharCode(65 + index),
            value: option
          }))

          return {
            ...question,
            ID: `${question.ID}-${subQuestion.ID}`,
            Content: subQuestion.content,
            Type: subQuestion.type,
            AnswerContent: JSON.stringify([
              {
                title: subQuestion.content,
                options,
                correctAnswer: subQuestion.correctAnswer
              }
            ])
          }
        })

        return formattedQuestions
      }

      if (answerContent.options && Array.isArray(answerContent.options) && answerContent.correctAnswer) {
        const options = answerContent.options.map((option, index) => ({
          key: String.fromCharCode(65 + index),
          value: option
        }))

        return {
          ...question,
          AnswerContent: JSON.stringify([
            {
              title: question.Content,
              options,
              correctAnswer: answerContent.correctAnswer
            }
          ])
        }
      } else if (
        answerContent.leftItems &&
        Array.isArray(answerContent.leftItems) &&
        answerContent.rightItems &&
        Array.isArray(answerContent.rightItems)
      ) {
        return {
          ...question,
          Type: question.Type === 'matching' ? 'dropdown-list' : question.Type,
          AnswerContent: {
            ...answerContent,
            type: question.Type === 'matching' ? 'dropdown-list' : answerContent.type
          }
        }
      } else if (answerContent.type === 'dropdown-list') {
        return question
      }

      throw new Error('Invalid question format: missing required fields')
    } catch (error) {
      console.error('Error formatting question data:', error)
      return null
    }
  }

  const navigatorQuestions = useMemo(() => {
    if (!testData?.Parts) {
      return []
    }

    const questions = []
    groupedQuestions.forEach(group => {
      questions.push({
        partIndex: group.partIndex,
        questionIndex: 0,
        question: group.questions[0]
      })
    })
    return questions
  }, [groupedQuestions, testData?.Parts])

  if (isSubmitted) {
    return <NextScreen nextPath="/grammar" skillName="Listening" imageSrc={SubmissionImage} />
  }

  if (isLoading) {
    return <Spin size="large" className="flex min-h-screen items-center justify-center" />
  }

  if (error) {
    return <Alert type="error" message="Failed to load test data" description={error.message} />
  }

  const currentGroup = getCurrentGroup()
  const flatIndex = getCurrentFlatIndex()
  const totalQuestions = getTotalQuestions()
  const isFlagged = currentGroup?.questions[0] && flaggedQuestions.includes(currentGroup.questions[0].ID)

  return (
    <TestNavigation
      testData={{
        ...testData,
        Parts: navigatorQuestions.map(q => ({
          ...q.question.Part,
          Questions: [q.question]
        }))
      }}
      currentQuestion={currentGroup?.questions[0]}
      flatIndex={flatIndex}
      totalQuestions={totalQuestions}
      isFlagged={isFlagged}
      onFlag={toggleFlag}
      onQuestionChange={goToQuestion}
      onNext={goToNext}
      onSubmit={handleSubmit}
      onAutoSubmit={handleAutoSubmit}
      userAnswers={userAnswers}
      flaggedQuestions={flaggedQuestions}
      skillName={testData.Parts[0].Questions[0].Skill.Name}
    >
      <Typography.Title level={4} className="mb-4">
        {currentGroup?.questions[0]?.Part?.Content}
      </Typography.Title>
      {currentGroup && (
        <PlayStopButton
          audioUrl={currentGroup.audioUrl}
          questionId={currentGroup.questions[0]?.ID}
          onPlayingChange={setIsAudioPlaying}
        />
      )}
      {currentGroup?.questions.map(question => {
        const formattedQ = formatQuestionData(question)
        const qType = formattedQ?.Type || question.Type

        if (question.Type === 'listening-questions-group') {
          if (!Array.isArray(formattedQ)) {
            return null
          }

          return (
            <div key={question.ID} className="mt-6">
              <Typography.Title level={4} className="mb-6">
                {question.Content}
              </Typography.Title>
              {formattedQ.map(subQuestion => (
                <div key={subQuestion.ID} className="mb-8">
                  <MultipleChoice
                    questionData={subQuestion}
                    userAnswer={userAnswers}
                    setUserAnswer={setUserAnswers}
                    onSubmit={answer => handleAnswerSubmit(subQuestion.ID, answer)}
                    className="mt-6"
                    setUserAnswerSubmit={() => {}}
                  />
                </div>
              ))}
            </div>
          )
        }

        return (
          <div key={question.ID} className="mt-6">
            {qType === 'multiple-choice' ? (
              <MultipleChoice
                questionData={formattedQ}
                userAnswer={userAnswers}
                setUserAnswer={setUserAnswers}
                onSubmit={answer => handleAnswerSubmit(question.ID, answer)}
                className="mt-6"
                setUserAnswerSubmit={() => {}}
              />
            ) : qType === 'matching' || qType === 'dropdown-list' ? (
              <DropdownQuestion
                questionData={formattedQ}
                userAnswer={userAnswers}
                setUserAnswer={setUserAnswers}
                className="z-0 mt-6"
              />
            ) : null}
          </div>
        )
      })}
    </TestNavigation>
  )
}

export default ListeningTest
