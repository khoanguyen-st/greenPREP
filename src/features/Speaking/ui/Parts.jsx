import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchTopicData from '../api' // Import the API function
import Part from './components/Part'

const Parts = () => {
  const { part } = useParams() // Get part from URL (e.g., "1", "2", "3")
  const [partData, setPartData] = useState(null)
  useEffect(() => {
    const getData = async () => {
      if (part) {
        try {
          const data = await fetchTopicData(part) // Fetch data for the specific part
          setPartData(data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    getData()
  }, [part])

  // Separate useEffect to log the latest partData after state updates
  useEffect(() => {
    console.log('Updated partData:', partData)
  }, [partData])

  return <Part data={partData} />
}

export default Parts
