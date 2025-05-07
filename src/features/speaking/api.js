/* eslint-disable no-undef */
import axiosInstance from '@shared/config/axios'
import { message } from 'antd'

const fetchTopicData = async partNumber => {
  try {
    const globalData = localStorage.getItem('globalData')
    const parsedData = JSON.parse(globalData)
    const topicId = parsedData.topicId

    const response = await axiosInstance.get(`/topics/${topicId}`, {
      params: { skillName: 'SPEAKING' }
    })

    const parts = response.data.Parts || []
    const selectedPart = parts.find(
      part => part.Content.toLowerCase().match(/part \d+/)?.[0] === `PART ${partNumber}`.toLowerCase()
    )

    return selectedPart || null
  } catch (error) {
    console.error('Error fetching topic data:', error)
    message.error('Failed to fetch topic data')
    return null
  }
}

const uploadToCloudinary = async blob => {
  try {
    const formData = new FormData()

    const fileName = `recording_${Date.now()}.mp3`
    const file = new File([blob], fileName, { type: 'audio/mpeg' })
    formData.append('file', file)
    formData.append('upload_preset', process.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append('resource_type', 'raw')

    const response = await fetch(
      `${process.env.VITE_CLOUDINARY_API_URL}/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
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

const initializeSpeakingAnswer = () => {
  const globalData = localStorage.getItem('globalData')

  const parsedData = JSON.parse(globalData)

  const sessionParticipantId = parsedData.sessionParticipantId
  const sessionId = parsedData.sessionId
  const studentId = parsedData.studentId
  const topicId = parsedData.topicId

  localStorage.removeItem('speaking_answer')
  const speakingAnswer = {
    studentId: studentId,
    topicId: topicId,
    sessionId: sessionId,
    skillName: 'SPEAKING',
    sessionParticipantId: sessionParticipantId,
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

const uploadToMinIO = async blob => {
  try {
    const fileName = `recording_${Date.now()}.mp3`
    const file = new File([blob], fileName, { type: 'audio/mpeg' })
    // Call BE to get presigned URL
    const res = await axiosInstance.get(`/presigned-url?filename=${file.name}`)
    const { uploadUrl, fileUrl } = await res.data

    // Upload to MinIO
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })

    console.warn('✅ Uploaded to MinIO successfully:', fileUrl)
    return { fileUrl }
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export {
  fetchTopicData,
  uploadToCloudinary,
  initializeSpeakingAnswer,
  addQuestionAnswer,
  submitSpeakingAnswer,
  uploadToMinIO
}
