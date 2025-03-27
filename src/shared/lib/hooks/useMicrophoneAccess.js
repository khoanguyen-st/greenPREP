import { message } from 'antd'
import { useEffect, useState } from 'react'

export const useMicrophoneAccess = () => {
  const [microphoneStatus, setMicrophoneStatus] = useState('disconnected')

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicrophoneStatus('connected'))
      .catch(() => {
        setMicrophoneStatus('disconnected')
        message.error('Please allow microphone access to continue.')
      })
  }, [])

  return microphoneStatus
}
