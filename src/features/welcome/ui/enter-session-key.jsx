import { ExclamationCircleOutlined } from '@ant-design/icons'
import { sessionKey } from '@assets/images'
import { createSessionRequest } from '@features/welcome/api'
import { Layout, Input, Button, Typography, Form, Image } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { Content } = Layout
const { Title, Text } = Typography

const EnterSessionKey = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // @ts-ignore
  const userId = useSelector(state => state.auth.user?.userId)
  const handleStart = ({ sessionKey }) => {
    localStorage.setItem('sessionKey', sessionKey)
    navigate('/waiting-for-approval')
  }

  return (
    <div>
      <Layout>
        <Content className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-5 md:flex-row md:gap-40 md:px-20">
          <div className="-translate-y-18 flex h-[250px] w-full transform items-center justify-center object-cover sm:h-[300px] sm:w-[300px] md:h-[550px] md:w-[550px] md:-translate-y-12">
            <Image src={sessionKey} preview={false} />
          </div>

          <div className="mt-0 flex w-full flex-col items-center pr-0 md:mt-[-20%] md:w-[70%] md:items-start md:pr-5">
            <div className="mb-6 w-full text-center text-[28px] md:text-[40px] lgL:text-left">
              <Title className="mb-4 font-bold md:mb-5">
                Welcome to <span className="text-[#003087]">GreenPREP !</span>
              </Title>
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-8 lg:text-left">
                  <Text className="text-center text-lg font-normal leading-tight md:text-[40px]">
                    Have you received the session key?
                  </Text>
                </div>
                <Text className="w-fit text-left text-sm text-gray-600 md:text-[20px] lg:text-center">
                  Please enter session key to start test
                </Text>
              </div>
            </div>
            <Form form={form} onFinish={handleStart} className="md:align-center w-full max-w-[300px]">
              <Form.Item
                name="sessionKey"
                rules={[
                  { required: true, message: 'Please enter the session key' },
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.resolve()
                      }

                      // try {
                      //   const userId = localStorage.getItem('userId')
                      //   const res = await createSessionRequest(value.trim(), userId)
                      //   if (res.status !== 0) {
                      //     return Promise.reject(new Error(res.message || 'This session key is invalid.'))
                      //   }
                      //   return Promise.resolve()
                      // } catch {
                      //   return Promise.reject(new Error('Cannot verify session key. Please try again.'))
                      // }
                      try {
                        const res = await createSessionRequest(value.trim(), userId)
                        // eslint-disable-next-line no-console
                        console.log('API response:', res)
                        if (res.data.status !== 0) {
                          return Promise.reject(new Error(res.data.message || 'This session key is invalid.'))
                        }

                        return Promise.resolve()
                      } catch (error) {
                        // eslint-disable-next-line no-console
                        console.log('User ID:', userId)
                        console.error('Session key validation failed:', error)
                        return Promise.reject(new Error('Cannot verify session key. Please try again.'))
                      }
                    }
                  }
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter session key here"
                  className="w-full rounded-md border border-gray-300 p-2"
                  suffix={
                    form.getFieldError('sessionKey').length > 0 ? (
                      <ExclamationCircleOutlined className="text-red-500" />
                    ) : null
                  }
                />
              </Form.Item>
              <div className="flex w-full justify-center md:justify-start">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-md bg-[#003087] px-6 py-2 hover:!bg-[#131663]"
                  htmlType="submit"
                >
                  Submit key
                </Button>
              </div>
            </Form>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default EnterSessionKey
