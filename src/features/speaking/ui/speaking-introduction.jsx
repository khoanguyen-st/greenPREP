import { useSpeakingData } from '@shared/context/speaking-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const SpeakingIntroduction = () => {
  const navigate = useNavigate()
  const part = 1
  const data = useSpeakingData()
  const onStart = () => {
    navigate('/speaking/microphonetest')
  }

  return <Introduction data={data} onStart={onStart} />
}
