import { submitWritingAnswers } from '@features/writing/api'
import { message } from 'antd'

export const submitWritingTest = async ({ data, navigate }) => {
  try {
    if (!data?.Parts) {
      return
    }

    const localAnswers = JSON.parse(localStorage.getItem('writingAnswers')) || {}
    const globalData = JSON.parse(localStorage.getItem('globalData')) || {}

    const { studentId, topicId, sessionParticipantId, sessionId } = globalData

    if (!studentId || !topicId || !sessionParticipantId) {
      message.error({
        content: 'Missing session information. Please try again or contact support.',
        duration: 5
      })
      return
    }

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
    message.error({
      content: 'Cannot submit answers. Please contact technical support.',
      duration: 5
    })
  }
}
