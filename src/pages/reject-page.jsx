import { iconRe } from '@assets/images'
import SharedHeader from '@shared/ui/base-header'
import { Button, Grid, Image, Layout, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography
const { Content } = Layout
const { useBreakpoint } = Grid

const DesktopRejectRequestPage = () => {
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const handleBackHome = () => {
    localStorage.removeItem('status')
    navigate('/', { replace: true })
  }
  useEffect(() => {
    const data = localStorage.getItem('status')
    if (!data) {
      navigate('/ ', { replace: true })
    }
  }, [])

  return (
    <Layout className="h-screen w-full overflow-hidden">
      <SharedHeader />
      <Content className="bg-white">
        <div className="flex h-[calc(100vh-64px)] flex-col items-center p-2 sm:p-3 md:p-4 lg:p-4">
          <Space direction="vertical" align="center" size="small" className="mt-12 w-full max-w-2xl">
            <Title level={2} className="text-center">
              Oopsss! Your request has been denied
            </Title>

            <Text className="block text-2xl">Please reach out to your teacher for support!</Text>

            <div className="flex w-full items-center justify-center">
              <Image
                src={iconRe}
                alt="Reject Request Icon"
                preview={false}
                width={
                  screens.xs ? 180 : screens.sm ? 400 : screens.md ? 300 : screens.lg ? 350 : screens.xl ? 400 : 450
                }
                height={
                  screens.xs ? 250 : screens.sm ? 400 : screens.md ? 350 : screens.lg ? 400 : screens.xl ? 450 : 500
                }
                style={{ objectFit: 'contain' }}
              />
            </div>

            <Button
              type="primary"
              size={screens.xs ? 'small' : screens.sm ? 'middle' : screens.md ? 'large' : 'large'}
              onClick={handleBackHome}
              className="h-auto bg-blue-900 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm md:px-6 md:py-2 md:text-base lg:px-8 lg:py-2.5 lg:text-lg xl:px-10 xl:text-xl"
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
