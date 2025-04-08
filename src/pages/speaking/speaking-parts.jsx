import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined'
import { fetchTopicData } from '@features/speaking/api'
import Part from '@features/speaking/ui/part'
import { Spin } from 'antd'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SpeakingParts = () => {
  const { part } = useParams()
  const navigate = useNavigate()
  const [partData, setPartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const partNumber = useMemo(() => parseInt(part, 10), [part])

  const fetchData = useCallback(async partNumber => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchTopicData(partNumber)
      if (data) {
        setPartData(data)
        return data
      } else {
        setError('No data found for this part')
        return null
      }
    } catch (err) {
      console.error(`Error fetching part ${partNumber} data:`, err)
      setError(`Failed to load part ${partNumber}`)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleNextPart = async () => {
    const nextPart = partNumber + 1
    try {
      const nextPartData = await fetchTopicData(nextPart)
      if (nextPartData) {
        navigate(`/speaking/test/${nextPart}`)
      }
    } catch (err) {
      console.error('Error fetching next part:', err)
      setError('Unable to load the next part. Please try again.')
    }
  }

  useEffect(() => {
    if (part) {
      fetchData(partNumber)
    }
  }, [part, partNumber, fetchData])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl text-red-500">{error}</p>
          <button
            onClick={() => fetchData(partNumber)}
            className="rounded-lg bg-[#003087] px-6 py-3 text-white hover:bg-[#002670]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return partData ? <Part data={partData} onNextPart={handleNextPart} /> : null
}

export default SpeakingParts
