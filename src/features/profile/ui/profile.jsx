import { LeftOutlined, LogoutOutlined } from '@ant-design/icons'
import { useChangeUserPassword, useUpdateUserProfile, useUserProfile } from '@features/profile/hooks/useProfile'
import ChangePasswordModal from '@features/profile/ui/change-password-profile'
import EditProfileModal from '@features/profile/ui/edit-profile'
import { EMAIL_REG, PHONE_REG } from '@shared/lib/constants/reg'
import SharedHeader from '@shared/ui/base-header'
import { Avatar, Button, Card, Menu, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import StudentHistory from './student-history'

const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().matches(EMAIL_REG, 'Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(PHONE_REG, { message: 'Invalid phone number format' })
    .required('Phone number is required')
})

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // @ts-ignore
  const auth = useSelector(state => state.auth)
  const { data: userData, isLoading, isError, refetch } = useUserProfile(auth.user?.userId)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('edit')
  const updateProfileMutation = useUpdateUserProfile()
  const changePasswordMutation = useChangeUserPassword()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || ''
      })
    }
  }, [userData])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const handleSave = async () => {
    try {
      if (formData.phone.length < 10 || formData.phone.length > 10) {
        message.error('Phone number must have 10 digits')
        return
      }

      await profileValidationSchema.validate(formData, { abortEarly: false })

      await updateProfileMutation.mutateAsync({
        userId: auth.user?.userId,
        userData: formData
      })

      message.success('Profile updated successfully!')
      refetch()
      setIsEditModalOpen(false)
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Failed to update profile')
      } else if (error.inner) {
        error.inner.forEach(err => message.error(err.message))
      } else {
        message.error('Failed to update profile')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    message.error('Unable to load profile information. Please try again later.')
    return null
  }

  const openChangePassword = () => {
    setIsPasswordModalOpen(true)
  }
  return (
    <>
      <SharedHeader />
      <div className="p-6">
        <Button onClick={() => navigate('/')} type="primary" className="mb-4 bg-[#003087] hover:!bg-[#002b6c]">
          <LeftOutlined /> Back to Home
        </Button>
        <Card className="mb-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-400 text-4xl font-bold text-black md:h-24 md:w-24 md:rounded-[50%]">
              {userData?.lastName?.charAt(0)}
            </Avatar>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">
                {userData?.firstName} {userData?.lastName}
              </h2>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="primary"
                className="bg-[#003087] hover:!bg-[#002b6c]"
                size="large"
                onClick={openChangePassword}
              >
                Change Password
              </Button>
              <Button type="default" size="large" onClick={() => setIsEditModalOpen(true)}>
                Edit
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full rounded-xl md:w-1/6">
            <Menu
              mode="vertical"
              selectedKeys={[selectedTab]}
              onClick={({ key }) => setSelectedTab(key)}
              items={[
                { key: 'edit', label: 'Edit Profile' },
                { key: 'history', label: 'Test History' },
                {
                  key: 'logout',
                  label: (
                    <span className="text-red-600">
                      <LogoutOutlined className="mr-2" />
                      Sign out
                    </span>
                  ),
                  onClick: handleLogout
                }
              ]}
            />
          </div>

          <div className="flex-1">
            {selectedTab === 'edit' && (
              <Card className="!border !border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-gray-600">Phone Number:</p>
                    <p>{userData.phone || 'Not available'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Student Code:</p>
                    <p>{userData.studentCode || 'Not available'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Address:</p>
                    <p>{userData.address || 'Not available'}</p>
                  </div>
                </div>
              </Card>
            )}

            {selectedTab === 'history' && (
              <Card className="">
                <StudentHistory userId={auth.user?.userId} />
              </Card>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
      />

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
        userId={auth.user?.userId}
        onSubmit={async (userId, passwordData) => {
          try {
            await changePasswordMutation.mutateAsync({ userId, passwordData })
            refetch()
            setIsPasswordModalOpen(false)
          } catch (error) {
            if (error.response) {
              message.error(error.response.data.message || 'Failed to change password')
            } else {
              message.error('Failed to change password')
            }
          }
        }}
      />
    </>
  )
}

export default Profile
