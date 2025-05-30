import { Layout, Input, Button, Typography, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import sessionKeyImage from '../../assets/Images/session-key.png'
const { Content } = Layout
const { Title, Text } = Typography

const FAKE_SESSION_KEYS = ['ABC123XYZ', 'TEST-SESSION-001', 'MOCK_KEY_2025', 'APTIS-EXAM-456', 'VALIDKEY789']

const EnterSessionKey = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/waiting-for-approval')
  }

  return (
    <Layout>
      <Content className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-5 md:flex-row md:gap-40 md:px-20">
        <div className="flex w-full items-center justify-center md:w-[30%]">
          <img src={sessionKeyImage} alt="Mascot" className="max-w-[250px] object-contain md:max-w-[550px]" />
        </div>
        <div className="mt-0 flex w-full flex-col items-center pr-0 md:mt-[-20%] md:w-[70%] md:items-start md:pr-5">
          <div className="mb-6 w-full text-center">
            <Title className="mb-4 text-[28px] font-bold md:mb-5 md:text-[40px]">
              Welcome to <span className="text-[#003087]">GreenPREP !</span>
            </Title>
            <Text className="mb-4 block text-lg font-normal leading-tight md:mb-5 md:text-[40px]">
              Have you received the session key?
            </Text>
            <Text className="block text-center text-sm text-gray-600 md:text-left md:text-[20px]">
              Please enter session key to start test
            </Text>
          </div>
          <Form form={form} onFinish={handleStart} className="w-full max-w-[300px]">
            <Form.Item
              name="sessionKey"
              rules={[
                { required: true, message: "Session key isn't empty!" },
                { max: 100, message: 'Session key is too long!' },
                () => ({
                  validator(_, value) {
                    if (!value || FAKE_SESSION_KEYS.includes(value.trim())) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('This session key is invalid. Please try again'))
                  }
                })
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
                className="rounded-md bg-[#01033D] px-6 py-2 hover:!bg-[#131663]"
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
