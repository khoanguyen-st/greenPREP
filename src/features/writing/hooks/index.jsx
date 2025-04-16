import { submitWritingAnswers } from '@features/writing/api'
import { useGlobalData } from '@shared/hooks/useGlobalData'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export const useSubmitWritingTest = () => {
  const navigate = useNavigate()
  const { getGlobalData, errorMessage, setErrorMessage, setShowErrorModal } = useGlobalData()

  const submitWritingTest = async data => {
    try {
      if (!data?.Parts) {
        return
      }

      const localAnswers = JSON.parse(localStorage.getItem('writingAnswers')) || {}
      const globalData = getGlobalData()

      if (!globalData) {
        return
      }

      const { studentId, topicId, sessionParticipantId, sessionId } = globalData

      const payload = {
        studentId,
        topicId,
        skillName: 'WRITING',
        sessionParticipantId,
        sessionId,
        questions: []
      }

      data.Parts.forEach(part => {
        part.Questions.forEach((question, index) => {
          const key = `answer-${part.ID}-${index}`
          const answerText = localAnswers[key] || ''
          payload.questions.push({
            questionId: question.ID,
            answerText,
            answerAudio: null
          })
        })
      })

      await submitWritingAnswers(payload)

      localStorage.removeItem('writingAnswers')
      localStorage.removeItem('flaggedParts')

      navigate('/complete-test')
    } catch (error) {
      console.error(error)
      setErrorMessage('Cannot submit answers. Please contact technical support.')
      setShowErrorModal(true)
      message.error({
        content: 'Cannot submit answers. Please contact technical support.',
        duration: 5
      })
    }
  }

  return { submitWritingTest, errorMessage, setErrorMessage, setShowErrorModal }
}
