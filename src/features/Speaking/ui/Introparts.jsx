import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchTopicData from '../api' // Import the API function
import Intropart from './components/Intropart'

const SpeakingTest = () => {
  const { part } = useParams() // Get part from URL (e.g., "1", "2", "3")
  const [partData, setPartData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      if (part) {
        const data = await fetchTopicData(part) // Fetch data for the specific part
        setPartData(data)
      }
    }
    getData()
  }, [part])

  // Separate useEffect to log the latest partData after state updates
  useEffect(() => {
    console.log('Updated partData:', partData)
  }, [partData])

  return <Intropart /> // Pass the fetched data to Intropart
}

export default SpeakingTest
