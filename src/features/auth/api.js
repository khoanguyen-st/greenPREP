import axiosInstance from '@shared/config/axios'
import { ACCESS_TOKEN } from '@shared/lib/constants/auth'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const API_BASE_URL = 'https://dev-api-greenprep.onrender.com/api'
// Hàm gọi API cơ bản
const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, {
    email,
    password
  })
  if (response.data?.data?.access_token) {
    localStorage.setItem(ACCESS_TOKEN, response.data.data.access_token)
  }
  return response.data
}
const forgotPasswordAPI = payload => {
  return axiosInstance.post('/users/forgot-password', payload)
}
const resetPasswordAPI = async ({ token, newPassword }) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/reset-password`,
    {
      token,
      newPassword
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )
  return response.data
}

const logoutAPI = async userId => {
  const token = localStorage.getItem(ACCESS_TOKEN)

  if (!userId || !token) {
    throw new Error('User ID or token not found')
  }

  const response = await axiosInstance.post(`/users/logout/${userId}`)
  return response.data
}
// Custom hooks sử dụng React Query
export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI
  })
}
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async params => {
      const { data } = await forgotPasswordAPI(params)
      return data.data
    }
    // onSuccess() {
    //   message.success("Please check your email to reset your password");
    // },
    // onError({ response }) {
    //   message.error(response.data.message);
    // },
  })
}
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordAPI
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutAPI
  })
}
