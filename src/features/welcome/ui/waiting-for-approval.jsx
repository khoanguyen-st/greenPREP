import { WaitingGif } from '@assets/images'
import { useGetStudentSessionRequest } from '@features/welcome/hooks'
import SharedHeader from '@shared/ui/base-header'
import { Image, Layout, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const WaitingForApproval = () => {
  const { Content } = Layout
  const { Title, Text } = Typography
  const navigate = useNavigate()
  const { userId, sessionId, requestId } = useParams()

  const { data, isLoading } = useGetStudentSessionRequest({ sessionId, userId, requestId })

  useEffect(() => {
    if (!isLoading && data) {
      const sessionRequest = data?.data?.sessionRequest
      const sessionPaticipantId = data?.data?.sessionParticipant?.ID
      const status = sessionRequest?.status

      localStorage.setItem('sessionPaticipantId', JSON.stringify(sessionPaticipantId))

      if (status === 'approved') {
        navigate('/introduction')
      }
      if (status === 'rejected') {
        navigate('/rejected')
      }
    }
  }, [data, isLoading, navigate])

  return (
    <Layout className="min-h-screen">
      <SharedHeader />
      <Content className="p-4 text-center">
        <div className="mt-12">
          <Title level={2}>Your request is in the teacher&apos;s hands!</Title>
          <Text className="mt-2 block text-2xl">Sit tight and hold on for a moment!</Text>
          <Image src={WaitingGif} alt="Notification" preview={false} width={319} height={341} className="mt-12" />
        </div>
      </Content>
    </Layout>
  )
}

export default WaitingForApproval
