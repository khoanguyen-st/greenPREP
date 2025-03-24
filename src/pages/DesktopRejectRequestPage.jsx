import SharedHeader from '@shared/ui/SharedHeader'
import { Layout, Typography, Button, Space, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { iconRe } from '../assets/Images/assets'
const { Title, Text } = Typography
const { Content } = Layout

const DesktopRejectRequestPage = () => {
  const navigate = useNavigate()

  return (
    <Layout className="h-screen overflow-hidden">
      <SharedHeader />
      <Content className="bg-white">
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center">
          <Space direction="vertical" align="center" size="large">
            <Title level={1} className="m-0 text-center">
              Oopsss! Your request has been denied
            </Title>

            <Text className="text-center text-lg">Please reach out to your teacher for support!</Text>

            <Image
              src={iconRe}
              alt="Reject Request Icon"
              preview={false}
              width={283.48}
              height={355}
              style={{ objectFit: 'contain' }}
            />

            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/homepage')}
              className="h-auto bg-blue-900 px-8 py-2.5 text-lg"
            >
              Go Back Home
            </Button>
          </Space>
        </div>
      </Content>
    </Layout>
  )
}

export default DesktopRejectRequestPage
