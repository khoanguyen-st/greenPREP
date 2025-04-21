import { useWritingData } from '@shared/context/writing-context'
import { Introduction } from '@shared/ui/introduction'
import useAntiCheat from '@shared/utils/antiCheat'
import { useNavigate } from 'react-router-dom'

const WritingIntroduction = () => {
  const navigate = useNavigate()
  const data = useWritingData()
  const { enableFullScreen } = useAntiCheat()

  const onStart = async () => {
    await enableFullScreen()
    navigate('/writing/test')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default WritingIntroduction
