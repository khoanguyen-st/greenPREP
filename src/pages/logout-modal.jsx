import { logout } from '@app/providers/reducer/auth/authSlice'
import { useLogout } from '@features/auth/api'
import { ACCESS_TOKEN } from '@shared/lib/constants/auth'
import { Button, Modal, Typography, message } from 'antd'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutError, setLogoutError] = useState(null)
  const [logoutSuccess, setLogoutSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Get user data from token
  const getUserData = () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN)
      return token ? jwtDecode(token) : null
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  // Use the custom logout hook
  const { mutate: logoutUser } = useLogout()

  // Function to handle local logout (clears storage and state)
  const performLocalLogout = successMessage => {
    // Clear all auth related data
    dispatch(logout())
    localStorage.removeItem('userId')
    localStorage.removeItem(ACCESS_TOKEN)
    sessionStorage.removeItem(ACCESS_TOKEN)

    // Show success message if provided
    if (successMessage) {
      setLogoutSuccess(successMessage)
      message.success(successMessage)
    }

    // Close modal and redirect
    onClose()
    navigate('/login')
  }

  const handleLogout = async () => {
    setIsLoading(true)
    setLogoutError('')
    setLogoutSuccess('')

    try {
      // Get user data before logout
      const userData = getUserData()
      // Use bracket notation to access properties safely
      const userId = userData
        ? userData['_id'] || userData['id'] || userData['sub'] || null
        : localStorage.getItem('userId')

      if (userId) {
        // Call the logout API
        await logoutUser(userId)

        // Perform local logout
        performLocalLogout('Logout successful!')
      } else {
        // No userId found, just log out locally
        performLocalLogout('Logout successful!')
      }
    } catch (error) {
      console.error('Logout error:', error)
      setLogoutError('Failed to logout from server')

      // Still logout locally even if API call fails
      message.warning('Logged out locally. Server logout failed.')
      performLocalLogout()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={null}
      centered
      width={400}
      maskClosable={false}
      closable={false}
      className="overflow-hidden rounded-lg"
      bodyStyle={{ padding: '40px 32px 32px' }}
    >
      <div className="flex flex-col items-center">
        <Title level={4} className="!m-0 mb-1 text-center !text-[22px] font-medium">
          Do you want to log out?
        </Title>

        <div className="mx-auto mb-6 h-[3px] w-[90px] bg-[#1677FF]"></div>

        <Text className="mx-auto mb-8 max-w-[310px] text-center text-sm leading-[1.9] tracking-wide text-[rgba(0,0,0,0.65)]">
          Are you sure you want to log out? You will need to log in again to access your account.
        </Text>

        {logoutError && <Text className="mb-4 text-red-500">{logoutError}</Text>}

        {logoutSuccess && <Text className="mb-4 text-green-500">{logoutSuccess}</Text>}

        <div className="flex w-full justify-center gap-4">
          <Button
            onClick={onClose}
            className="h-[40px] w-[160px] rounded-md text-[14px] font-normal shadow-md"
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleLogout}
            type="primary"
            danger
            className="h-[40px] w-[160px] rounded-md text-[14px] font-normal shadow-md"
            loading={isLoading}
          >
            Log out
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default LogoutModal
