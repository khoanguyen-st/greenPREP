import { getStudentSessionRequest, joinSession } from '@features/welcome/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useJoinSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: joinSession,
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      return response.data.data
    },
    onError: error => {
      message.error(error.response?.data?.message || 'Failed to join session. Please try again.')
    }
  })
}
export const useGetStudentSessionRequest = ({ sessionId, userId, requestId }) => {
  return useQuery({
    queryKey: ['student-session-request', sessionId, userId, requestId],
    queryFn: () => getStudentSessionRequest({ sessionId, userId, requestId }),
    refetchInterval: 3000
  })
}
