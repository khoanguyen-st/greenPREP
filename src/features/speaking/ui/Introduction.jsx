import { useSpeakingData } from '@shared/context/speaking-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const IntroductionSpeaking = () => {
  const navigate = useNavigate()
  const data = useSpeakingData()
  const onStart = () => {
    navigate('/speaking/instruction')
  }

  return <Introduction data={data} onStart={onStart} />
}
