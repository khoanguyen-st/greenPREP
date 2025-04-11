import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import ForgotPasswordImg from '@assets/images/forgotpassword.png'
import { useResetPassword } from '@features/auth/api'
import ResetPasswordSuccess from '@pages/ResetPasswordSuccess'
import { Form, Input, Button, Typography, Image, message, ConfigProvider } from 'antd'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
const { Title, Paragraph } = Typography
const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const resetPasswordMutation = useResetPassword()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const validatePasswordComplexity = (_, value) => {
    if (!value) {
      return Promise.reject('New password is required.')
    }
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    const isLongEnough = value.length >= 8

    if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return Promise.reject(
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      )
    }
    return Promise.resolve()
  }
  const handleSubmit = async values => {
    try {
      const token = searchParams.get('token')

      if (!token) {
        message.error('Invalid or missing reset token')
        return
      }
      resetPasswordMutation.mutate(
        { token, newPassword: values.newPassword },
        {
          onSuccess: () => {
            setIsSuccessModalVisible(true)
          },
          onError: error => {
            console.error('Reset password error:', error)
            message.error({
              content: 'Failed to update password. Please try again.',
              duration: 3
            })
          }
        }
      )
    } catch (error) {
      console.error('Reset password error:', error)
      message.error({
        content: 'Failed to update password. Please try again.',
        duration: 3
      })
    }
  }
  const preventCopyPaste = (e, isVisible) => {
    if (!isVisible) {
      e.preventDefault()
      message.warning('Cannot copy hidden password. Show password to copy.')
    }
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#003087',
          borderRadius: 6,
          fontSize: 16,
          controlHeight: 48
        }
      }}
    >
      <div className="flex min-h-screen w-full bg-white">
        <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:w-1/2 md:px-8 lg:px-12">
          <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <Title level={3} className="!m-0 text-xl !text-[#003087] sm:text-2xl md:text-3xl">
                GreenPREP
              </Title>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Title level={2} className="!m-0 text-2xl !font-bold sm:text-3xl md:text-4xl">
                Set a password
              </Title>
              <Paragraph type="secondary" className="!m-0 !mt-2 text-xs sm:text-sm">
                Your previous password has been reset. Please set a new password for your account.
              </Paragraph>
            </div>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark
              className="w-full space-y-3 sm:space-y-4"
            >
              <Form.Item
                name="newPassword"
                label={
                  <span className="text-sm font-medium sm:text-base">
                    New Password <span className="text-red-500">*</span>
                  </span>
                }
                rules={[{ validator: validatePasswordComplexity }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  className="h-12 rounded-lg bg-gray-50 text-xs placeholder:text-xs sm:text-sm sm:placeholder:text-sm"
                  iconRender={visible => {
                    setIsPasswordVisible(visible)
                    return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }}
                  onCopy={e => preventCopyPaste(e, isPasswordVisible)}
                  onCut={e => preventCopyPaste(e, isPasswordVisible)}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label={
                  <span className="text-sm font-medium sm:text-base">
                    Confirm New Password <span className="text-red-500">*</span>
                  </span>
                }
                required={false}
                rules={[
                  { required: true, message: 'Confirm new password is required.' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Passwords do not match.'))
                    }
                  })
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm your password"
                  className="h-12 rounded-lg bg-gray-50 text-xs placeholder:text-xs sm:text-sm sm:placeholder:text-sm"
                  iconRender={visible => {
                    setIsConfirmPasswordVisible(visible)
                    return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }}
                  onCopy={e => preventCopyPaste(e, isConfirmPasswordVisible)}
                  onCut={e => preventCopyPaste(e, isConfirmPasswordVisible)}
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    className="h-12 rounded-lg !bg-[#003087] text-sm font-medium !text-white hover:!bg-[#003087]/90 sm:text-base"
                    disabled={
                      resetPasswordMutation.isPending ||
                      !form.isFieldsTouched(['newPassword', 'confirmPassword'], true) ||
                      Boolean(form.getFieldsError().filter(({ errors }) => errors.length).length)
                    }
                    loading={resetPasswordMutation.isPending}
                    style={{ boxShadow: 'none', border: 'none' }}
                  >
                    Set Password
                  </Button>
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  block
                  onClick={() => navigate('/login')}
                  className="h-12 rounded-lg border border-[#003087] text-sm text-[#003087] hover:border-[#003087] hover:bg-transparent hover:text-[#003087] sm:text-base"
                  style={{ backgroundColor: 'transparent' }}
                >
                  Back to login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="hidden w-1/2 items-center justify-center bg-white p-8 md:flex lg:p-16">
          <div className="relative aspect-square w-full max-w-[600px]">
            <Image
              src={ForgotPasswordImg}
              alt="Forgot Password Illustration"
              preview={false}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>

      <ResetPasswordSuccess open={isSuccessModalVisible} />
    </ConfigProvider>
  )
}
export default ResetPassword
