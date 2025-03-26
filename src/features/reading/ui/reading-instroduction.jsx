import { useReadingData } from '@shared/context/reading-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const ReadingIntroduction = () => {
  const navigate = useNavigate()
  const data = useReadingData()
  const onStart = () => {
    console.warn('Navigating to Reading Test Page')
    navigate('/reading/reading-test-page')
  }

  return <Introduction data={data} onStart={onStart} />
}
