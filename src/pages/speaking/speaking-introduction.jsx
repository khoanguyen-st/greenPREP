import { useSpeakingData } from '@shared/context/speaking-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

const SpeakingIntroduction = () => {
  const navigate = useNavigate()
  const data = useSpeakingData()
  const onStart = () => {
    navigate('/speaking/microphonecheck')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default SpeakingIntroduction
