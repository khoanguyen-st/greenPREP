import axios from '@shared/config/axios'
// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchListeningTestDetails = async () => {
  try {
    const globalDataStr = localStorage.getItem('globalData')
    if (!globalDataStr) {
      throw new Error('Missing globalData in localStorage')
    }

    const globalData = JSON.parse(globalDataStr)
    if (!globalData || typeof globalData !== 'object') {
      throw new Error('Invalid globalData format in localStorage')
    }

    const topicId = globalData.topicId
    if (!topicId) {
      throw new Error('Missing topicId in localStorage.globalData')
    }

    const response = await axios.get(`${API_BASE_URL}/topics/${topicId}`, {
      params: {
        skillName: 'LISTENING'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching listening test details:', error)
    throw error
  }
}

export const saveListeningAnswers = async formattedAnswers => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student-answers`, formattedAnswers)
    return response.data
  } catch (error) {
    console.error('Error saving listening answers:', error)
    throw error
  }
}
