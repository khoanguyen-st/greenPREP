import { iconRe } from '@assets/images'
import SharedHeader from '@shared/ui/base-header'
import { Layout, Typography, Button, Space, Image, Grid } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography
const { Content } = Layout
const { useBreakpoint } = Grid

const RejectRequestPage = () => {
  const navigate = useNavigate()
  const screens = useBreakpoint()

  return (
    <Layout className="h-screen w-full overflow-hidden">
      <SharedHeader />
      <Content className="bg-white">
        <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center p-6">
          <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <Space direction="vertical" align="center" size={screens.sm ? 16 : screens.md ? 20 : 24} className="w-full">
              <Title level={2} className="m-0 text-center">
                Oopsss! Your request has been denied
              </Title>

              <Text className="-mt-2 block text-center text-2xl">Please reach out to your teacher for support!</Text>

              <div className="mt-12 flex w-full items-center justify-center">
                <Image
                  src={iconRe}
                  alt="Reject Request Icon"
                  preview={false}
                  width={319}
                  height={341}
                  className="mt-1"
                  style={{ objectFit: 'contain', maxWidth: '100%' }}
                />
              </div>

              <Button
                type="primary"
                onClick={() => navigate('/')}
                className="mb-6 mt-0 h-auto bg-blue-900 px-9 py-2 text-base"
              >
                Go Back Home
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default RejectRequestPage
