import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTopicData } from '@features/speaking/api'
import { Spin } from 'antd'
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined'

import Part from './components/Part'
import { CompletionDialog } from './components/CompletionDialog'
import { ErrorDisplay } from './components/ErrorDisplay'

export const Parts = () => {
  const { part } = useParams()
  const navigate = useNavigate()
  const [partData, setPartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      } else {
        setIsDialogOpen(true)
      }
    } catch (err) {
      console.error('Error fetching next part:', err)
      setError('Unable to load the next part. Please try again.')
    }
  }

  const handleConfirmHome = () => {
    setIsDialogOpen(false)
    navigate('/')
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
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
    return <ErrorDisplay message={error} onRetry={() => fetchData(partNumber)} />
  }

  return (
    <>
      {partData ? <Part data={partData} onNextPart={handleNextPart} /> : null}

      <CompletionDialog isOpen={isDialogOpen} onClose={handleCloseDialog} onConfirm={handleConfirmHome} />
    </>
  )
}
