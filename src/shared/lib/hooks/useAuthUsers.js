import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = 'https://dev-api-greenprep.onrender.com/api/users'

export const useRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: data => axios.post(`${API_URL}/register`, data),
    onSuccess,
    onError
  })
}

/** @param {import('@tanstack/react-query').UseMutationOptions<any, Error, string>} options */
export const useCheckStudentCode = options => {
  return useMutation({
    mutationFn: studentCode => axios.post(`${API_URL}/register`, { studentCode }),
    ...options
  })
}

/** @param {import('@tanstack/react-query').UseMutationOptions<any, Error, string>} options */
export const useCheckEmail = options => {
  return useMutation({
    mutationFn: email => axios.post(`${API_URL}/register`, { email }),
    ...options
  })
}

/** @param {import('@tanstack/react-query').UseMutationOptions<any, Error, { email: string, password: string }>} options */
export const useLogin = options => {
  return useMutation({
    mutationFn: data => axios.post(`${API_URL}/login`, data),
    ...options
  })
}
