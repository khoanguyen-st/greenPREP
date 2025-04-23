import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons'
import { ForgotPasswordImg } from '@assets/images/'
import { useForgotPassword } from '@features/auth/api'
import { Button, Col, ConfigProvider, Form, Image, Input, message, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { mutate } = useForgotPassword()
  const validateMessages = {
    required: 'Please enter your email address',
    types: {
      email: 'Please enter a valid email address'
    }
  }
  const handleSubmit = async values => {
    try {
      // @ts-ignore
      mutate(
        // @ts-ignore
        { email: values.email.toLowerCase(), host: window.location.origin },
        {
          onSuccess: () => {
            message.success({
              content: 'Password reset link sent to your email',
              duration: 3,
              icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
            })
            form.resetFields()
          },
          onError: error => {
            console.error('Forgot password error:', error)
            message.error({
              content: 'Something went wrong. Please try again.',
              duration: 3
            })
          }
        }
      )
    } catch (error) {
      console.error('Forgot password error:', error)
      message.error({
        content: 'Something went wrong. Please try again.',
        duration: 3
      })
    }
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      form.submit()
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
      <Row className="min-h-screen w-full bg-white" role="main">
        <Col xs={24} md={12} className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-12">
          <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <Title level={3} className="!m-0 text-xl !text-[#003087] sm:text-2xl md:text-3xl">
                GreenPREP
              </Title>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Title level={2} className="!m-0 text-2xl !font-bold sm:text-3xl md:text-4xl">
                Forgot Password?
              </Title>
              <Paragraph type="secondary" className="!m-0 !mt-2 text-sm sm:text-base">
                No worries, we&apos;ll send you reset instruction.
              </Paragraph>
            </div>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              validateMessages={validateMessages}
              className="w-full space-y-4 sm:space-y-6"
              size="large"
              role="form"
              aria-label="Forgot Password Form"
            >
              <Form.Item
                name="email"
                required={false}
                label={
                  <span className="text-sm font-medium sm:text-base">
                    Email{' '}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </span>
                }
                rules={[{ required: true }, { type: 'email' }]}
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-12 rounded-lg bg-gray-50 text-xs placeholder:text-xs sm:text-sm sm:placeholder:text-sm"
                  onKeyPress={handleKeyPress}
                  aria-required="true"
                  aria-invalid={form.getFieldError('email').length > 0}
                />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={!form.isFieldTouched('email') || Boolean(form.getFieldError('email').length)}
                    className="h-12 rounded-lg !bg-[#003087] text-sm font-medium !text-white hover:!bg-[#003087]/90 sm:text-base"
                    style={{
                      boxShadow: 'none',
                      border: 'none'
                    }}
                  >
                    Reset Password
                  </Button>
                )}
              </Form.Item>
              <Form.Item className="!-mt-0">
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
        </Col>
        <Col xs={0} md={12} className="flex items-center justify-center bg-white p-8 lg:p-16">
          <div className="relative aspect-square w-full max-w-[600px]">
            <Image
              src={ForgotPasswordImg}
              alt="Forgot Password Illustration"
              preview={false}
              className="h-full w-full object-contain"
            />
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
export default ForgotPassword
