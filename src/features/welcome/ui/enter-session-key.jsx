import { ExclamationCircleOutlined } from '@ant-design/icons'
import { sessionKey as sessionKeyImage } from '@assets/images'
import { useJoinSession } from '@features/welcome/hooks'
import { Button, Form, Image, Input, Layout, message, Typography } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title, Text } = Typography

const EnterSessionKey = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { userId } = useSelector(state => state.auth.user)

  const joinSession = useJoinSession()

  const handleStart = async values => {
    const { sessionKey } = values
    if (userId) {
      try {
        const res = await joinSession.mutateAsync({ sessionKey, userId })
        const { ID: requestId, SessionID: sessionId, UserID: userIdFromRes } = res.data
        localStorage.setItem('key', JSON.stringify({ requestId, sessionId, userIdFromRes }))
        message.success('Your request has been submitted successfully!')
        navigate(`/waiting-for-approval/${userIdFromRes}/${sessionId}/${requestId}`)
      } catch (error) {
        message.error(error?.response?.data || 'Failed to join session. Please try again.')
      }
    }
  }

  useEffect(() => {
    const status = localStorage.getItem('status')
    if (status) {
      localStorage.removeItem('status')
    }
    if (localStorage.getItem('globalData')) {
      navigate('/introduction')
    }
    if (JSON.parse(localStorage.getItem('key'))) {
      const key = JSON.parse(localStorage.getItem('key'))
      navigate(`/waiting-for-approval/${key.userIdFromRes}/${key.sessionId}/${key.requestId}`)
    }
  }, [])

  return (
    <Layout>
      <Content className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-5 sm:gap-10 md:flex-row md:gap-40 md:px-20">
        <div className="-translate-y-18 flex h-[250px] w-[250px] transform justify-center object-cover sm:h-[300px] sm:w-[300px] md:h-[550px] md:w-[550px] md:-translate-y-12">
          <Image src={sessionKeyImage} preview={false} />
        </div>
        <div className="mt-0 flex w-full flex-col items-center pr-0 md:mt-[-20%] md:w-[70%] md:items-start md:pr-5">
          <div className="mb-1 w-full text-center sm:mb-6 md:mb-5 lgL:text-left">
            <Title className="!mb-2 !text-[28px] font-bold sm:!mb-[20px] md:!text-[40px]">
              Welcome to <span className="text-[#003087]">GreenPREP !</span>
            </Title>
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-2 sm:mb-8">
                <Text className="text-center text-lg font-normal leading-tight md:text-[40px] lg:text-left">
                  Have you received the session key?
                </Text>
              </div>
              <Text className="w-fit text-left text-sm md:text-[20px] lg:text-center">
                Please enter session key to start test
              </Text>
            </div>
          </div>
          <Form form={form} onFinish={handleStart} className="w-full max-w-[300px]">
            <Form.Item
              name="sessionKey"
              rules={[
                {
                  required: true,
                  message: 'Session key is required'
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
  )
}

export default EnterSessionKey
