import { useReadingData } from '@shared/context/reading-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

const ReadingIntroduction = () => {
  const navigate = useNavigate()
  const data = useReadingData()
  const onStart = () => {
    navigate('/reading/test')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default ReadingIntroduction
