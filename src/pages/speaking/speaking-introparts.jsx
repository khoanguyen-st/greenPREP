import introContent from '@features/speaking/data'
import Intropart from '@features/speaking/ui/intropart'
import { useParams } from 'react-router-dom'

const SpeakingIntroparts = () => {
  const { part } = useParams()

  const partNumber = parseInt(part, 10)
  const partData = introContent[partNumber] || { title: 'Unknown Part', description: 'No description available.' }

  return <Intropart data={partData} part={part} />
}

export default SpeakingIntroparts
