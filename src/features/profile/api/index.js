import axiosInstance from '@shared/config/axios'

export const fetchUserProfile = async userId => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`)
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

export const updateUserProfile = async ({ userId, userData }) => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, userData)
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

export const changeUserPassword = async ({ userId, passwordData }) => {
  try {
    const { data } = await axiosInstance.post(`/users/${userId}/change-password`, passwordData)
    return data
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
}

export const fetchStudentHistory = async userId => {
  try {
    const { data } = await axiosInstance.get(`/session-participants/user/${userId}`)
    return data
  } catch (error) {
    console.error('Error fetching session history')
    throw error
  }
}
