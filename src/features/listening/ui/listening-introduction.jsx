import { useListeningData } from '@shared/context/listening-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const ListeningIntroduction = () => {
  const navigate = useNavigate()
  const data = useListeningData()
  const onStart = () => {
    navigate('/listening/test-part1')
  }

  return <Introduction data={data} onStart={onStart} />
}
