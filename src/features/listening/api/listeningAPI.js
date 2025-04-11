import axios from '@shared/config/axios'

const API_BASE_URL = import.meta.env.VITE_TEST_BASE_URL
const API_SAVE_ANSWERS = import.meta.env.VITE_BASE_URL

export const fetchListeningTestDetails = async () => {
  const response = await axios.get(`${API_BASE_URL}/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc`, {
    params: {
      skillName: 'LISTENING'
    }
  })
  return response.data
}

export const saveListeningAnswers = async formattedAnswers => {
  try {
    const response = await axios.post(`${API_SAVE_ANSWERS}/student-answers`, formattedAnswers)
    return response.data
  } catch (error) {
    console.error('Error saving listening answers:', error)
    throw error
  }
}
