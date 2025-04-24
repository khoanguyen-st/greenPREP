import { WaitingGif } from '@assets/images'
import { useGetStudentSessionRequest } from '@features/welcome/hooks'
import SharedHeader from '@shared/ui/base-header'
import { Image, Layout, message, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const { Content } = Layout
const { Title, Text } = Typography

const WaitingForApproval = () => {
  const navigate = useNavigate()
  const { userId, sessionId, requestId } = useParams()

  const { data, isLoading, isError, error } = useGetStudentSessionRequest({
    sessionId,
    userId,
    requestId
  })

  useEffect(() => {
    if (isError && error) {
      message.error(error.message || 'Failed to get session request status')
      return
    }

    if (isLoading || !data) {
      return
    }

    const { sessionRequest, sessionParticipant, status } = data?.data || {}

    if (status === 'rejected') {
      localStorage.removeItem('key')
      localStorage.setItem('status', 'rejected')
      navigate('/rejected')
      return
    }

    // Handle approved status
    if (sessionRequest?.status === 'approved' && sessionParticipant) {
      handleApprovedRequest(sessionParticipant)
    }
  }, [data, isLoading, isError, error, navigate])

  const handleApprovedRequest = participant => {
    const {
      ID,
      SessionID,
      UserID: studentId,
      Session: { examSet: topicId, sessionName }
    } = participant

    // Store session data
    const sessionData = {
      sessionName,
      sessionParticipantId: ID,
      sessionId: SessionID,
      studentId,
      topicId
    }
    localStorage.setItem('globalData', JSON.stringify(sessionData))
    message.success('Your request has been approved')

    const key = JSON.parse(localStorage.getItem('key') || '{}')
    const isContinuingSession = sessionData.sessionId === key.sessionId && sessionData.studentId === key.userIdFromRes

    if (!isContinuingSession) {
      localStorage.removeItem('current_skill')
      const urlParams = {
        userIdFromRes: userId,
        sessionId,
        requestId
      }
      localStorage.setItem('key', JSON.stringify(urlParams))
    }

    navigateToCorrectPage()
  }

  const navigateToCorrectPage = () => {
    const currentSkill = localStorage.getItem('current_skill')

    if (currentSkill) {
      const skillRoutes = {
        grammar: '/grammar',
        reading: '/reading',
        listening: '/listening',
        speaking: '/speaking',
        writing: '/writing'
      }

      navigate(skillRoutes[currentSkill] || '/grammar')
    } else {
      navigate('/introduction')
    }
  }

  return (
    <Layout className="min-h-screen">
      <SharedHeader />
      <Content className="p-4 text-center">
        <div className="mt-12">
          <Title level={2}>Your request is in the teacher&apos;s hands!</Title>
          <Text className="mt-2 block text-2xl">Sit tight and hold on for a moment!</Text>
          <Image
            src={WaitingGif}
            alt="Waiting for approval"
            preview={false}
            width={319}
            height={341}
            className="mt-12"
          />
        </div>
      </Content>
    </Layout>
  )
}

export default WaitingForApproval
