import { mockProfileData, mockHistoryData } from '@features/profile/api/mock-data'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getProfile = async () => {
  await delay(500)
  return mockProfileData
}

export const getHistoryList = async () => {
  await delay(800)
  return mockHistoryData
}

export const updateProfile = async data => {
  await delay(500)
  Object.assign(mockProfileData, data)
  return mockProfileData
}

export const profileApi = {
  getProfile,
  getHistoryList,
  updateProfile
}
