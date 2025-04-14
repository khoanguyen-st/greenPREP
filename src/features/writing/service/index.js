import { submitWritingAnswers } from '@features/writing/api'
import { message } from 'antd'

export const submitWritingTest = async ({ data, userId, navigate }) => {
  try {
    if (!data?.Parts) {
      return
    }

    const localAnswers = JSON.parse(localStorage.getItem('writingAnswers')) || {}
    const sessionParticipantId = JSON.parse(localStorage.getItem('sessionParticipantId'))

    const payload = {
      studentId: userId,
      topicId: 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc',
      skillName: 'WRITING',
      sessionParticipantId,
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
  } catch {
    message.error({
      content: 'Cannot submit answers. Please contact technical support.',
      duration: 5
    })
  }
}
