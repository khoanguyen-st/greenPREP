import { useParams } from 'react-router-dom'

import introContent from '../data' // Import the static intro content
import Intropart from './components/Intropart'

const Introparts = () => {
  const { part } = useParams() // Get part from URL (e.g., "1", "2", "3")

  // Ensure `part` is a valid number and retrieve the corresponding intro content
  const partNumber = parseInt(part, 10) // Convert part to number
  const partData = introContent[partNumber] || { title: 'Unknown Part', description: 'No description available.' }

  return <Intropart data={partData} part={part} /> // Pass the fetched data to Intropart
}

export default Introparts
