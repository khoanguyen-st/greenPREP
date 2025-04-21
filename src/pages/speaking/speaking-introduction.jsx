import { useSpeakingData } from '@shared/context/speaking-context'
import { Introduction } from '@shared/ui/introduction'
import useAntiCheat from '@shared/utils/antiCheat'
import { useNavigate } from 'react-router-dom'

const SpeakingIntroduction = () => {
  const navigate = useNavigate()
  const data = useSpeakingData()
  const { enableFullScreen } = useAntiCheat()

  const onStart = async () => {
    await enableFullScreen()
    navigate('/speaking/microphonecheck')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default SpeakingIntroduction
