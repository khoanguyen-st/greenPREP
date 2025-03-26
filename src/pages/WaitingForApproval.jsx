import { Layout, Typography, Image } from 'antd'
import { Logo } from '@assets/images'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SharedHeader from '../shared/ui/SharedHeader'

const { Content } = Layout
const { Title, Text } = Typography

const WaitingForApproval = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/introduction')
    }, 5000)
  }, [navigate])

  return (
    <Layout className="min-h-screen">
      <SharedHeader />
      <Content className="p-4 text-center">
        <div className="mt-12">
          <Title level={2}>Your request is in the teacher&apos;s hands!</Title>
          <Text className="mt-2 block text-2xl">Sit tight and hold on for a moment!</Text>
          <Image src={Logo} alt="Notification" preview={false} width={319} height={341} className="mt-12" />
        </div>
      </Content>
    </Layout>
  )
}

export default WaitingForApproval
