import { useEffect, useState } from 'react'

const useAntiCheat = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (!document.fullscreenEnabled) {
      setAlertMessage('⚠️ Your browser does not support full-screen mode. Please use Chrome or Firefox!')
      setShowAlert(true)
      return
    }

    const triggerAlert = message => {
      setAlertMessage(message)
      setShowAlert(true)
    }

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        triggerAlert('⚠️ You exited full-screen mode! Return within 15 seconds, or your test will be submitted.')
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerAlert('⚠️ You switched away from the test! Return within 15 seconds, or your test will be submitted.')
      }
    }

    const handleWindowBlur = () => {
      triggerAlert('⚠️ You left the test window! Return within 15 seconds, or your test will be submitted.')
    }

    const handleRestrictedActions = e => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'v'].includes(e.key.toLowerCase())) {
        e.preventDefault()
        triggerAlert(
          `⚠️ ${e.key.toUpperCase()} is strictly prohibited! Return within 15 seconds, or your test will be submitted.`
        )
      }
    }

    const blockContextMenu = e => {
      e.preventDefault()
      triggerAlert('⚠️ Right-clicking is disabled! Return within 15 seconds, or your test will be submitted.')
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowBlur)
    document.addEventListener('keydown', handleRestrictedActions)
    document.addEventListener('contextmenu', blockContextMenu)

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleWindowBlur)
      document.removeEventListener('keydown', handleRestrictedActions)
      document.removeEventListener('contextmenu', blockContextMenu)
    }
  }, [])

  const enableFullScreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
        setShowAlert(false)
      } else {
        throw new Error('Full-screen mode is not supported.')
      }
    } catch (err) {
      console.error('Failed to enable full-screen mode:', err)
      setAlertMessage('⚠️ Full-screen activation failed! Please enable it manually to continue your test.')
      setShowAlert(true)
    }
  }

  return { showAlert, alertMessage, enableFullScreen }
}

export default useAntiCheat
