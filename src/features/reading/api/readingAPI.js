import axiosInstance from '@shared/config/axios'

const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchReadingTestDetails = async () => {
  const globalData = JSON.parse(localStorage.getItem('globalData'))

  if (!globalData?.topicId) {
    throw new Error('Topic ID not found in global data')
  }

  const response = await axiosInstance.get(`${API_BASE_URL}/topics/${globalData.topicId}`, {
    params: {
      skillName: 'READING'
    }
  })
  return response.data
}

export const submitStudentAnswers = async submitData => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/student-answers`, submitData)
    return response.data
  } catch (error) {
    console.error('Error submitting student answers:', error)
    throw error
  }
}
