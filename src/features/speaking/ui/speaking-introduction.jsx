import { useSpeakingData } from '@shared/context/speaking-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const SpeakingIntroduction = () => {
  const navigate = useNavigate()
  const data = useSpeakingData()
  const onStart = () => {
<<<<<<< HEAD
    navigate('/speaking/test')
=======
    navigate('/speaking/microphonetest')
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
  }

  return <Introduction data={data} onStart={onStart} />
}
