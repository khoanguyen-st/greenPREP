import { ACCESS_TOKEN } from '@shared/lib/constants/auth'
import { useMutation } from '@tanstack/react-query'

import axiosInstance from '@/shared/config/axios'

const loginAPI = async ({ email, password }) => {
  const response = await axiosInstance.post(`/users/login`, {
    email,
    password
  })

  if (response.data?.data?.access_token) {
    localStorage.setItem(ACCESS_TOKEN, response.data.data.access_token)
  }

  return response.data
}

const forgotPasswordAPI = async email => {
  const response = await axiosInstance.post(
    `/users/forgot-password`,
    { email },
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

  const response = await axiosInstance.post(
    `/users/logout/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  )

  return response.data
}

const resetPasswordAPI = async ({ token, newPassword }) => {
  const response = await axiosInstance.post(
    `/users/reset-password`,
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

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordAPI
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
