import axiosInstance from '@shared/config/axios'
import { useMutation } from '@tanstack/react-query'

export const useRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: data => axiosInstance.post(`/users/register`, data),
    onSuccess,
    onError
  })
}

/** @param {import('@tanstack/react-query').UseMutationOptions<any, Error, { email: string, password: string }>} options */
export const useLogin = options => {
  return useMutation({
    mutationFn: data => axiosInstance.post(`/login`, data),
    ...options
  })
}
