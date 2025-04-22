import { PASSWORD_REG } from '@shared/lib/constants/reg'
import { Button, Form, Input, message, Modal } from 'antd'
import { useState } from 'react'
import * as Yup from 'yup'

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
})

const ChangePasswordModal = ({ open, onCancel, onSubmit, userId }) => {
  const [form] = Form.useForm()
  const [passwordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await passwordValidationSchema.validate(values, { abortEarly: false })
      await onSubmit(userId, values)
      message.success('Password changed successfully')
      handleClose()
    } catch (error) {
      if (error.inner) {
        error.inner.forEach(err => {
          message.error(err.message)
        })
      } else {
        message.error(error.message || 'Failed to change password')
      }
    }
  }

  const handleClose = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={<div className="text-center text-2xl font-semibold">Change Password</div>}
      open={open}
      onCancel={handleClose}
      destroyOnClose
      footer={
        <div className="flex justify-end space-x-4">
          <Button key="cancel" onClick={handleClose} className="h-10 w-24 border border-[#D1D5DB] text-[#374151]">
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  handleSubmit()
                })
                .catch(info => {
                  console.error('Validation Failed:', info)
                })
            }}
            className="h-10 w-24 bg-[#003087] hover:bg-[#003087]/90"
          >
            Change
          </Button>
        </div>
      }
      width={500}
      maskClosable={false}
      className="change-password-modal"
    >
      <Form form={form} layout="vertical" initialValues={passwordData} className="px-4">
        <Form.Item
          label={<span>Current Password</span>}
          name="oldPassword"
          rules={[{ required: true, message: 'Please enter your current password' }]}
          hasFeedback
        >
          <Input.Password className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
        </Form.Item>

        <Form.Item
          label={<span>New Password</span>}
          name="newPassword"
          rules={[
            { required: true, message: 'Please input password!' },
            {
              pattern: PASSWORD_REG,
              message:
                'Password more than 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
            }
          ]}
          hasFeedback
        >
          <Input.Password className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
        </Form.Item>

        <Form.Item
          label={<span>Confirm Password</span>}
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match'))
              }
            })
          ]}
        >
          <Input.Password className="h-11 rounded-lg border-[#D1D5DB] bg-[#F9FAFB] px-3" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal
