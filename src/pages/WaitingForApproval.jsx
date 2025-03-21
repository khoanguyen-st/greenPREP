import { Layout, Typography, Image } from 'antd'
import SharedHeader from '../shared/ui/SharedHeader'

const { Content } = Layout
const { Title, Text } = Typography

const WaitingForApproval = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SharedHeader />
      <Content style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ marginTop: '50px' }}>
          <Title level={2}>Your request is in the teacher&apos;s hands!</Title>
          <Text style={{ fontSize: '18px', display: 'block', marginTop: '8px' }}>
            Sit tight and hold on for a moment!
          </Text>
          <Image
            src="src/assets/Images/waiting.gif"
            alt="Notification"
            preview={false}
            width={200}
            style={{ marginTop: '16px' }}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default WaitingForApproval
