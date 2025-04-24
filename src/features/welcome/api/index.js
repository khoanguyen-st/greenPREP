import axiosInstance from '@shared/config/axios'

export const joinSession = async ({ sessionKey, userId }) => {
  return await axiosInstance.post('/session-requests', {
    sessionKey,
    UserID: userId
  })
}
export const getStudentSessionRequest = async ({ sessionId, userId, requestId }) => {
  try {
    const res = await axiosInstance.get(`/session-requests/${sessionId}/student/${userId}`, {
      params: { requestId }
    })
    return res.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
