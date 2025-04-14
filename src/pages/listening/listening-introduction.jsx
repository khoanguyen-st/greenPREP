import HeadphoneCheck from '@pages/listening/listening-headphonecheck'
import { useListeningData } from '@shared/context/listening-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

const ListeningIntroduction = () => {
  const navigate = useNavigate()
  const data = useListeningData()
  const onStart = () => {
    navigate('/listening/headphonecheck')
  }

  return (
    <>
      <Introduction data={data} onStart={onStart} />
      <HeadphoneCheck />
    </>
  )
}

export default ListeningIntroduction
