/* eslint-disable no-undef */
import axiosInstance from '@shared/config/axios'
import { message } from 'antd'

const fetchTopicData = async partNumber => {
  try {
    const response = await axiosInstance.get('/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', {
      params: { skillName: 'SPEAKING' }
    })

    const parts = response.data.Parts || []

    const selectedPart = parts.find(part => part.Content === `PART ${partNumber}`)

    return selectedPart || null
  } catch (error) {
    console.error('Error fetching topic data:', error)
    message.error('Failed to fetch topic data')
    return null
  }
}

const uploadToCloudinary = async (blob, topicId, partContent, questionIndex) => {
  try {
    const formData = new FormData()
    formData.append('file', blob)
    formData.append('upload_preset', process.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append('filename_override', `speaking_${topicId}_${partContent}_${questionIndex + 1}`)

    const response = await fetch(
      `${process.env.VITE_CLOUDINARY_API_URL}/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await response.json()
    console.warn('Uploaded successfully:', data)
    return data
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

const initializeSpeakingAnswer = topicId => {
  localStorage.removeItem('speaking_answer')
  const speakingAnswer = {
    studentId: '7a5cb071-5ba0-4ecf-a4cf-b1b62e5f9798',
    topicId: topicId,
    skillName: 'SPEAKING',
    sessionParticipantId: 'a8e2b9e8-bb60-44f0-bd61-6bd524cdc87d',
    questions: []
  }
  localStorage.setItem('speaking_answer', JSON.stringify(speakingAnswer))
  return speakingAnswer
}

const addQuestionAnswer = (questionId, answerAudio) => {
  const speakingAnswerStr = localStorage.getItem('speaking_answer')
  if (!speakingAnswerStr) {
    return
  }

  const speakingAnswer = JSON.parse(speakingAnswerStr)
  speakingAnswer.questions.push({
    questionId: questionId,
    answerText: null,
    answerAudio: answerAudio
  })
  localStorage.setItem('speaking_answer', JSON.stringify(speakingAnswer))
}

const submitSpeakingAnswer = async () => {
  const speakingAnswerStr = localStorage.getItem('speaking_answer')
  if (!speakingAnswerStr) {
    return
  }

  try {
    const speakingAnswer = JSON.parse(speakingAnswerStr)
    const response = await axiosInstance.post(`/student-answers`, speakingAnswer)
    localStorage.removeItem('speaking_answer')
    return response.data
  } catch (error) {
    message.error('Error submitting speaking answer')
    console.error('Error details:', error.response?.data || error.message)
    throw error
  }
}

export { fetchTopicData, uploadToCloudinary, initializeSpeakingAnswer, addQuestionAnswer, submitSpeakingAnswer }
