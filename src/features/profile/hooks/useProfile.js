import { changeUserPassword, fetchUserProfile, updateUserProfile, fetchStudentHistory } from '@features/profile/api'
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
    queryKey: ['studentSessionHistory', userId],
    queryFn: () => fetchStudentHistory(userId),
    enabled: Boolean(userId)
  })
}
