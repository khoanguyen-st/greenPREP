import { Component } from 'react'
import SharedHeader from "@shared/ui/SharedHeader";
import { Layout, Typography, Button, Space } from "antd";
const { Title, Text } = Typography;
const { Content } = Layout;

export default class DesktopRejectRequestPage extends Component {
  render() {
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

              <img 
                src="src\assets\Images\icon_re.jpg"
                alt="Reject Request Icon"
                style={{ 
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'contain'
                }}
              />

              <Button 
                type="primary"
                size="large"
                onClick={() => window.location.href = './homepage'}
                style={{
                  backgroundColor: '#1e3a8a', 
                  height: 'auto',
                  padding: '10px 30px',
                  fontSize: '1.1rem'
                }}
              >
                Go Back Home
              </Button>
            </Space>
          </div>
        </Content>
      </Layout>
    )
  }
}
