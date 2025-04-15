import { useState } from 'react'

export const getGlobalDataFromStorage = () => {
  try {
    const globalDataStr = localStorage.getItem('globalData')
    if (!globalDataStr) {
      throw new Error('Missing globalData in localStorage')
    }

    const globalData = JSON.parse(globalDataStr)
    if (!globalData || typeof globalData !== 'object') {
      throw new Error('Invalid globalData format in localStorage')
    }

    if (!globalData.studentId || !globalData.topicId || !globalData.sessionId || !globalData.sessionParticipantId) {
      throw new Error('Missing required fields in globalData')
    }

    return globalData
  } catch (error) {
    console.error('Error getting global data:', error)
    return null
  }
}

export const useGlobalData = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)

  const getGlobalData = () => {
    try {
      const globalData = getGlobalDataFromStorage()
      if (!globalData) {
        throw new Error('Missing globalData in localStorage')
      }
      return globalData
    } catch (error) {
      console.error('Error getting global data:', error)
      setErrorMessage('Failed to load test data. Please refresh the page or contact support.')
      setShowErrorModal(true)
      return null
    }
  }

  return {
    getGlobalData,
    errorMessage,
    setErrorMessage,
    showErrorModal,
    setShowErrorModal
  }
}

export default useGlobalData
