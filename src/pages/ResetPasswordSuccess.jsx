import { Modal, Button, Typography, Image, Layout, Space, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'

import resetPasswordSuccessImage from '../assets/images/resetpasswordsuccess.png'

const { Title, Text } = Typography
const { Content } = Layout

const ResetPasswordSuccess = ({ open = true }) => {
  const navigate = useNavigate()

  const handleGoToSignIn = () => {
    navigate('/login')
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#ffffff',
            borderRadiusLG: 18,
            paddingContentHorizontalLG: 0,
            boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
          },
          Layout: {
            colorBgBase: '#ffffff',
            colorBgContainer: '#ffffff',
            colorBgLayout: '#ffffff'
          }
        }
      }}
    >
      <Modal open={open} footer={null} closable={false} width={368} centered>
        <Layout className="h-[368px] w-full rounded-[18px]" style={{ background: '#ffffff' }}>
          <Content className="relative flex flex-col items-center" style={{ background: '#ffffff' }}>
            {/* Success Icon */}
            <Space className="mt-[18px]">
              <Image
                src={resetPasswordSuccessImage}
                alt="Reset Password Success"
                width={121}
                height={121}
                preview={false}
                className="object-contain"
              />
            </Space>

            {/* Success Title */}
            <Title
              level={4}
              className="absolute left-1/2 top-[160px] m-0 w-[320px] -translate-x-1/2 text-center font-['DM_Sans'] text-[24px] font-semibold leading-[26px] tracking-[0%] text-[#101828]"
            >
              Reset password Successful!
            </Title>

            {/* Success Message */}
            <Text className="absolute left-1/2 top-[210px] m-0 w-[300px] -translate-x-1/2 text-center font-['DM_Sans'] text-[14px] font-medium leading-[26px] tracking-[0%] text-[#475467]">
              Your password has been successfully changed
            </Text>

            {/* Go to Sign in Button */}
            <Button
              type="primary"
              onClick={handleGoToSignIn}
              className="absolute left-1/2 top-[290px] flex h-[41px] w-[152px] -translate-x-1/2 items-center justify-center rounded-[6px] bg-[#002B88] font-['DM_Sans'] text-[20px] font-medium leading-[26px] tracking-[0%] shadow-sm"
            >
              Go to Sign in
            </Button>
          </Content>
        </Layout>
      </Modal>
    </ConfigProvider>
  )
}

export default ResetPasswordSuccess
