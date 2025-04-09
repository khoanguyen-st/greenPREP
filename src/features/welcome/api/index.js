import axios from 'axios'
// @ts-ignore
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
export const createSessionRequest = async (sessionKey, userId) => {
  const res = await axios.post(`${VITE_BASE_URL}/session-requests`, {
    sessionKey,
    sessionId: '',
    UserID: userId
  })

  return res.data
}
