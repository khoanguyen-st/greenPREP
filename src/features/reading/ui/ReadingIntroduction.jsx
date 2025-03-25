import { useReadingData } from '@shared/context/reading-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const IntroductionReading = () => {
  const navigate = useNavigate()
  const data = useReadingData()
  const onStart = () => {
    navigate('/Reading/instruction')
  }

  return <Introduction data={data} onStart={onStart} />
}
