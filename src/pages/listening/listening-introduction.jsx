import { useListeningData } from '@shared/context/listening-context'
import { Introduction } from '@shared/ui/introduction'
import useAntiCheat from '@shared/utils/antiCheat'
import { useNavigate } from 'react-router-dom'

const ListeningIntroduction = () => {
  const navigate = useNavigate()
  const data = useListeningData()
  const { enableFullScreen } = useAntiCheat()

  const onStart = async () => {
    await enableFullScreen()
    navigate('/listening/headphonecheck')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default ListeningIntroduction
