import { useWritingData } from '@shared/context/writing-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const IntroductionWriting = () => {
  const navigate = useNavigate()
  const data = useWritingData()
  const onStart = () => {
    navigate('/writing/instruction')
  }

  return <Introduction data={data} onStart={onStart} />
}
