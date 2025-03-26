import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTopicData } from '@features/speaking/api' // Import the API function

import Part from './components/Part'

const Parts = () => {
  const { part } = useParams() // Get part from URL (e.g., "1", "2", "3")
  const navigate = useNavigate()
  const [partData, setPartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleNextPart = async () => {
    const nextPart = parseInt(part) + 1
    setIsLoading(true)
    try {
      const nextPartData = await fetchTopicData(nextPart)
      if (nextPartData) {
        navigate(`/speaking/test/${nextPart}`)
      } else {
        // If no next part, show completion message and return to home
        alert('You have completed all parts!')
        navigate('/')
      }
    } catch (err) {
      console.error('Error fetching next part:', err)
      setError('Error fetching next part')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      if (part) {
        setIsLoading(true)
        setError(null)
        try {
          const data = await fetchTopicData(part)
          if (data) {
            setPartData(data)
          } else {
            setError('No data found for this part')
          }
        } catch (err) {
          console.error('Error fetching part data:', err)
          setError('Failed to load data')
        } finally {
          setIsLoading(false)
        }
      }
    }
    getData()
  }, [part])

  // Separate useEffect to log the latest partData after state updates
  useEffect(() => {
    console.warn('Updated partData:', partData)
  }, [partData])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return <Part data={partData} onNextPart={handleNextPart} />
}

export default Parts
