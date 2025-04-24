import CustomAlert from '@shared/ui/custom-alert'
import useAntiCheat from '@shared/utils/antiCheat'
import { message } from 'antd'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const TestLayout = ({ children }) => {
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat()
  const [countdown, setCountdown] = useState(15)
  const [isCounting, setIsCounting] = useState(false)
  const navigate = useNavigate()

  const [warningCount, setWarningCount] = useState(() => {
    const path = window.location.pathname
    const storedCounts = JSON.parse(localStorage.getItem('warningCounts') || '{}')
    return storedCounts[path] || 0
  })

  useEffect(() => {
    const path = window.location.pathname
    const storedCounts = JSON.parse(localStorage.getItem('warningCounts') || '{}')
    storedCounts[path] = warningCount
    localStorage.setItem('warningCounts', JSON.stringify(storedCounts))
  }, [warningCount])

  useEffect(() => {
    if (showAlert && !isCounting) {
      setIsCounting(true)
      setCountdown(15)
    }
  }, [showAlert, isCounting])

  const handleSubmit = useCallback(async () => {
    const path = window.location.pathname
    const globalData = JSON.parse(localStorage.getItem('globalData')) || {}

    try {
      const storedCounts = JSON.parse(localStorage.getItem('warningCounts') || '{}')
      delete storedCounts[path]
      localStorage.setItem('warningCounts', JSON.stringify(storedCounts))

      const submitEvent = new CustomEvent('forceSubmit', {
        detail: { globalData }
      })
      window.dispatchEvent(submitEvent)

      if (path.includes('/speaking')) {
        localStorage.setItem('current_skill', 'listinening')
        navigate('/listening')
      } else if (path.includes('/listening')) {
        localStorage.setItem('current_skill', 'grammar')
        navigate('/grammar')
      } else if (path.includes('/grammar')) {
        localStorage.setItem('current_skill', 'reading')
        navigate('/reading')
      } else if (path.includes('/reading')) {
        localStorage.setItem('current_skill', 'writing')
        navigate('/writing')
      } else if (path.includes('/writing')) {
        localStorage.removeItem('current_skill')
        navigate('/complete-test')
      }
    } catch (error) {
      console.error('Error submitting test:', error)
      message.error('Failed to submit test. Please try again.')
    }
  }, [navigate])

  useEffect(() => {
    let timer
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (countdown === 0 && isCounting) {
      handleSubmit()
    }
    return () => clearInterval(timer)
  }, [countdown, isCounting, handleSubmit])

  const handleContinue = useCallback(async () => {
    if (warningCount >= 3) {
      handleSubmit()
      return
    }
    await enableFullScreen()
    setWarningCount(prev => prev + 1)
    setIsCounting(false)
  }, [warningCount, enableFullScreen, handleSubmit])

  return (
    <>
      {children}
      <CustomAlert
        show={showAlert}
        onConfirm={handleContinue}
        submittedText={alertMessage}
        countdown={countdown}
        warningCount={warningCount}
        totalCount={3}
      />
    </>
  )
}

export default TestLayout
