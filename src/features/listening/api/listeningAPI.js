import axiosInstance from '@shared/config/axios'

const API_BASE_URL = 'https://greenprep-api.onrender.com/api'

export const fetchListeningTestDetails = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc`, {
    params: {
      skillName: 'LISTENING'
    }
  })
  return response.data
}
