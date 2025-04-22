import { submitGrammarAnswers } from '@features/grammar/api'
import { message } from 'antd'

export const submitGrammarTest = async ({ data, answers }) => {
  try {
    if (!data?.Parts) {
      return
    }

    const globalData = JSON.parse(localStorage.getItem('globalData')) || {}
    const { studentId, topicId, sessionParticipantId, sessionId } = globalData

    if (!studentId || !topicId || !sessionParticipantId) {
      message.error({
        content: 'Missing session information. Please try again or contact support.',
        duration: 5
      })
      return
    }

    const allQuestions = data.Parts.flatMap(part => part.Questions || [])

    const questionsArray = allQuestions.map(question => {
      const questionId = question.ID
      const answerKey = Object.keys(answers).find(key => key === questionId || key === `answer-${questionId}`)
      const answer = answerKey ? answers[answerKey] : null

      let answerText = null
      if (typeof answer === 'string') {
        answerText = answer
      } else if (Array.isArray(answer)) {
        if (answer[0]?.left !== undefined) {
          answerText = answer
        } else if (answer[0]?.key !== undefined) {
          answerText = answer
        } else if (answer[0]?.ID !== undefined) {
          answerText = answer
        }
      }

      return {
        questionId,
        answerText,
        answerAudio: null
      }
    })

    const payload = {
      studentId,
      topicId,
      skillName: 'GRAMMAR AND VOCABULARY',
      sessionParticipantId,
      sessionId,
      questions: questionsArray
    }

    await submitGrammarAnswers(payload)

    localStorage.removeItem('grammarAnswers')
    localStorage.removeItem('flaggedQuestions')
  } catch (error) {
    console.error(error)
    message.error({
      content: 'Cannot submit answers. Please contact technical support.',
      duration: 5
    })
  }
}
