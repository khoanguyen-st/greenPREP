import { changeUserPassword, fetchUserProfile, updateUserProfile } from '@features/profile/api'
import axiosInstance from '@shared/config/axios'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useUserProfile = userId => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: Boolean(userId)
  })
}

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile
  })
}

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword
  })
}

export const useStudentHistory = userId => {
  return useQuery({
    queryKey: ['studentHistory', userId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/api/student/history/${userId}`)
        return response.data
      } catch (error) {
        if (error.response?.status === 404) {
          return { data: [] }
        }
        throw error
      }
    },
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000
  })
}
