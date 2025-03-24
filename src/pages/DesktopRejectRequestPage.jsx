import SharedHeader from "@shared/ui/SharedHeader";
import { Layout, Typography, Button, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Content } = Layout;

const DesktopRejectRequestPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <SharedHeader />
      <Content className="bg-white">
        <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 64px)' }}>
          <Space direction="vertical" align="center" size="large">
            <Title level={1} style={{ marginBottom: 0, textAlign: 'center' }}>
              Oopsss! Your request has been denied 
            </Title>
            
            <Text style={{ fontSize: '1.1rem', textAlign: 'center' }}>
              Please reach out to your teacher for support!
            </Text>

            <Image
              src="/src/assets/Images/icon_re.jpg"
              alt="Reject Request Icon"
              preview={false}
              width={283.48}
              height={355}
              className="object-contain"
            />

            <Button 
              type="primary"
              size="large"
              onClick={() => navigate('/homepage')}
              className="bg-blue-900 h-auto px-8 py-2.5 text-lg"
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
