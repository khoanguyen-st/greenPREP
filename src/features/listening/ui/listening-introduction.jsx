import { useListeningData } from '@shared/context/listening-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const ListeningIntroduction = () => {
  const navigate = useNavigate()
  const data = useListeningData()
  const onStart = () => {
<<<<<<< HEAD
    navigate('/listening/test')
=======
    navigate('/listening/test-part1')
>>>>>>> 1d8d7d6518d154ae534da19e48c10d5139e2feee
  }

  return <Introduction data={data} onStart={onStart} />
}
