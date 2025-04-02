import { mockChangePassword } from '@features/profile/api/mock-data'
import { Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePasswordPopup = ({ isOpen, onClose }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const passwordRules = [
    { required: true, message: 'Please input your password!' },
    { min: 8, message: 'Password must be at least 8 characters' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
  ]

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    setLoading(true)
    try {
      const response = await mockChangePassword({
        currentPassword,
        newPassword
      })

      if (response.success) {
        message.success('Password changed successfully! Please log in again.')
        onClose()
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    } catch (err) {
      if (err.message === 'Incorrect current password') {
        form.setFields([
          {
            name: 'currentPassword',
            errors: ['Current password is incorrect']
          }
        ])
      } else if (err.message.includes('Password policy')) {
        form.setFields([
          {
            name: 'newPassword',
            errors: [err.message]
          }
        ])
      } else {
        message.error('Failed to change password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={<h2 className="text-xl font-semibold text-gray-800">Change Password</h2>}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      className="max-w-md"
      width={440}
    >
      <Form form={form} layout="vertical" onFinish={handleChangePassword} className="mt-4">
        {/* Current Password Field */}
        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">Current Password</span>}
          name="currentPassword"
          rules={[{ required: true, message: 'Please input your current password!' }]}
          className="mb-4"
        >
          <Input.Password
            placeholder="Enter your current password"
            className="h-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>

        {/* New Password Field */}
        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">New Password</span>}
          name="newPassword"
          rules={passwordRules}
          className="mb-4"
        >
          <Input.Password
            placeholder="Enter new password"
            className="h-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">Confirm New Password</span>}
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords do not match!'))
              }
            })
          ]}
          className="mb-6"
        >
          <Input.Password
            placeholder="Confirm your new password"
            className="h-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-500"
          >
            {loading ? 'Changing...' : 'Change'}
          </button>
        </div>
      </Form>
    </Modal>
  )
}

export default ChangePasswordPopup
