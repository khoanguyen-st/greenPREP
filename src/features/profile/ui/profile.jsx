import { LeftOutlined } from '@ant-design/icons'
import { useChangeUserPassword, useUpdateUserProfile, useUserProfile } from '@features/profile/hooks/useProfile'
import ChangePasswordModal from '@features/profile/ui/change-password-profile'
import EditProfileModal from '@features/profile/ui/edit-profile'
import { EMAIL_REG, PHONE_REG } from '@shared/lib/constants/reg'
import SharedHeader from '@shared/ui/base-header'
import { Avatar, Button, Card, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
  // @ts-ignore
  const auth = useSelector(state => state.auth)
  const { data: userData, isLoading, isError, refetch } = useUserProfile(auth.user?.userId)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
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

  const handleEdit = () => {
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || ''
    })
    setIsEditModalOpen(true)
  }

  const handleCancelEdit = () => {
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || ''
    })
    setIsEditModalOpen(false)
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
        error.inner.forEach(err => {
          message.error(err.message)
        })
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
              <h2 className="text-2xl font-semibold text-gray-800">
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
              <Button type="default" size="large" onClick={handleEdit}>
                Edit
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-3 gap-8 md:grid-cols-3">
            <div>
              <p className="mb-1 text-gray-600">Phone number</p>
              <p className="text-gray-500">{userData.phone}</p>
            </div>
            <div>
              <p className="mb-1 text-gray-600">Student Code</p>
              <p className="text-gray-500">{userData.studentCode || 'Not available'}</p>
            </div>
            <div>
              <p className="mb-1 text-gray-600">Address</p>
              <p className="text-gray-500">{userData.address || 'Not available'}</p>
            </div>
          </div>
        </Card>

        <EditProfileModal
          open={isEditModalOpen}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
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
      <StudentHistory userId={auth.user?.userId} />
    </>
  )
}

export default Profile
