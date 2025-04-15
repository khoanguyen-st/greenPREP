import axios from '@shared/config/axios'
import { getGlobalDataFromStorage } from '@shared/hooks/useGlobalData'

export const fetchListeningTestDetails = async () => {
  try {
    const globalData = getGlobalDataFromStorage()

    if (!globalData) {
      throw new Error('Missing globalData in localStorage')
    }

    const topicId = globalData.topicId
    if (!topicId) {
      throw new Error('Missing topicId in localStorage.globalData')
    }

    const response = await axios.get(`/topics/${topicId}`, {
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
    const response = await axios.post(`/student-answers`, formattedAnswers)
    return response.data
  } catch (error) {
    console.error('Error saving listening answers:', error)
    throw error
  }
}
