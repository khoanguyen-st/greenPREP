import { updateUser } from '@app/providers/reducer/auth/authSlice'
import { changeUserPassword, fetchStudentHistory, fetchUserProfile, updateUserProfile } from '@features/profile/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

export const useUserProfile = userId => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: Boolean(userId)
  })
}

export const useUpdateUserProfile = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: response => {
      const updatedUser = response.data
      dispatch(updateUser(updatedUser))
    },
    onError: error => {
      console.error('Update profile failed:', error)
    }
  })
}

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword
  })
}

export const useStudentHistory = userId => {
  return useQuery({
    queryKey: ['studentSessionHistory', userId],
    queryFn: async () => {
      try {
        const data = await fetchStudentHistory(userId)
        return { data: data?.data || [] }
      } catch (error) {
        if (error.response?.status === 404) {
          return { data: [] }
        }
        throw error
      }
    },
    enabled: Boolean(userId)
  })
}
