import { useGrammarData } from '@shared/context/grammar-context'
import { Introduction } from '@shared/ui/introduction'
import { useNavigate } from 'react-router-dom'

export const GrammarIntroduction = () => {
  const navigate = useNavigate()
  const data = useGrammarData()
  const onStart = () => {
    navigate('/grammar/exercise')
  }

  return <Introduction data={data} onStart={onStart} />
}
