import { useGrammarData } from '@shared/context/grammar-context'
import { Introduction } from '@shared/ui/introduction'
import useAntiCheat from '@shared/utils/antiCheat'
import { useNavigate } from 'react-router-dom'
const GrammarIntroduction = () => {
  const navigate = useNavigate()
  const data = useGrammarData()
  const { enableFullScreen } = useAntiCheat()

  const onStart = async () => {
    await enableFullScreen()
    navigate('/grammar/test')
  }

  return <Introduction data={data} onStart={onStart} />
}

export default GrammarIntroduction
