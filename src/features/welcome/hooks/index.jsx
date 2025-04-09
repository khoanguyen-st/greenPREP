import { getStudentSessionRequest, joinSession } from '@features/welcome/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useJoinSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: joinSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
    onError: error => {
      console.error('this is hook', error)
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
