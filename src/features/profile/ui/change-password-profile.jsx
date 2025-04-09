import { PASSWORD_REG } from '@shared/lib/constants/reg'
import { Form, Input, message, Modal } from 'antd'
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
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const handleSubmit = async () => {
    try {
      await passwordValidationSchema.validate(passwordData, { abortEarly: false })
      await onSubmit(userId, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      })
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
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

  return (
    <Modal
      title="Change Password"
      open={open}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            handleSubmit(values)
          })
          .catch(info => {
            console.error('Validation Failed:', info)
          })
      }}
      onCancel={() => {
        form.resetFields()
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
        onCancel()
      }}
      width={400}
      okText="Change"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={passwordData}
        onValuesChange={(changedValues, allValues) => {
          setPasswordData(allValues)
        }}
      >
        <Form.Item
          label="Current Password"
          name="oldPassword"
          rules={[{ required: true, message: 'Please enter your current password' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
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
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal
