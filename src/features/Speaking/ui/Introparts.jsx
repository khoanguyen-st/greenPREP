import { useParams } from 'react-router-dom'

import introContent from '../data'
import Intropart from './components/Intropart'

export const Introparts = () => {
  const { part } = useParams()

  const partNumber = parseInt(part, 10)
  const partData = introContent[partNumber] || { title: 'Unknown Part', description: 'No description available.' }

  return <Intropart data={partData} part={part} />
}
