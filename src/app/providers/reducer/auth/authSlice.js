import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_KEY, getStorageData } from '@shared/lib/storage'
import { jwtDecode } from 'jwt-decode'
const checkAuth = () => Boolean(getStorageData(ACCESS_TOKEN_KEY))

const getUserRole = () => {
  try {
    const token = getStorageData(ACCESS_TOKEN_KEY)
    if (!token) {
      return null
    }
    const decodedToken = jwtDecode(token)

    // @ts-ignore
    return decodedToken.role || null
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

const getUserData = () => {
  try {
    const token = getStorageData(ACCESS_TOKEN_KEY)
    if (!token) {
      return null
    }
    const decodedToken = jwtDecode(token)

    return decodedToken || null
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
const initialState = {
  isAuth: checkAuth(),
  role: getUserRole(),
  user: getUserData()
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true
      state.user = getUserData()
    },
    logout(state) {
      state.isAuth = false
      state.role = null
      state.user = null
    },
    updateRole(state) {
      state.role = getUserRole()
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        }
      }
    }
  }
})
const { reducer, actions } = authSlice
export const { logout, login, updateUser } = actions
export default reducer
