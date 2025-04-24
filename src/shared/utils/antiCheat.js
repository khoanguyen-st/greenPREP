import { useEffect, useRef, useState } from 'react'

const useAntiCheat = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const violationCount = useRef(0)
  const lastPosition = useRef({ x: 0, y: 0 })
  const suspiciousMovements = useRef(0)
  const fullscreenExitTimestamp = useRef(0)

  useEffect(() => {
    if (!document.fullscreenEnabled) {
      setAlertMessage('⚠️ Your browser does not support full-screen mode. Please use Chrome or Firefox!')
      setShowAlert(true)
      return
    }

    const wasFullscreen = sessionStorage.getItem('wasFullscreen') === 'true'
    const exitedFullscreen = sessionStorage.getItem('exitedFullscreen') === 'true'

    if ((wasFullscreen || exitedFullscreen) && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Failed to restore fullscreen on page load:', err)
      })
      sessionStorage.removeItem('exitedFullscreen')
    }

    const triggerAlert = message => {
      setAlertMessage(message)
      setShowAlert(true)
    }

    const disableTextSelection = e => {
      e.preventDefault()
      triggerAlert('⚠️ Text selection is not allowed during the test!')
      return false
    }

    document.body.style.userSelect = 'none'

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        sessionStorage.setItem('exitedFullscreen', 'true')
        fullscreenExitTimestamp.current = Date.now()

        triggerAlert('⚠️ You exited full-screen mode! Return within 15 seconds, or your test will be submitted.')

        setTimeout(() => {
          if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
              console.error('Failed to auto-restore fullscreen mode:', err)
            })
          }
        }, 500)
      } else {
        sessionStorage.removeItem('exitedFullscreen')
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
      if (e.key === 'Escape') {
        e.preventDefault()
        triggerAlert(`⚠️ Using ESC key to exit fullscreen is prohibited during the test!`)
        // Try to re-enable fullscreen if possible
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(err => {
            console.error('Failed to re-enter fullscreen after ESC press:', err)
          })
        }
        return
      }

      // Block page reload key combinations
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r') || (e.metaKey && e.key === 'r')) {
        e.preventDefault()
        triggerAlert(`⚠️ Page refreshing is prohibited during the test!`)
        return
      }

      // Block browser navigation keys
      if (e.key === 'F5' || e.key === 'Escape' || (e.altKey && e.key === 'Left') || (e.altKey && e.key === 'Right')) {
        e.preventDefault()
        triggerAlert(`⚠️ Browser navigation is prohibited during the test!`)
        return
      }

      // Block ALL function keys
      if (e.key.startsWith('F') && !isNaN(e.key.substring(1))) {
        e.preventDefault()
        triggerAlert(`⚠️ Function keys are prohibited during the test!`)
        return
      }

      // Block tab switching combinations
      if ((e.altKey && e.key === 'Tab') || (e.ctrlKey && e.key === 'Tab')) {
        e.preventDefault()
        triggerAlert(`⚠️ Tab switching is prohibited during the test!`)
        return
      }

      // Block screenshot commands
      if (
        (e.ctrlKey && e.key === 'PrintScreen') ||
        (e.metaKey && e.shiftKey && e.key === '4') ||
        (e.metaKey && e.shiftKey && e.key === '3')
      ) {
        e.preventDefault()
        triggerAlert(`⚠️ Screenshots are prohibited during the test!`)
        return
      }

      // Block existing copy/paste
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault()
        triggerAlert(`⚠️ ${e.key.toUpperCase()} is strictly prohibited during the test!`)
      }
    }

    const blockContextMenu = e => {
      e.preventDefault()
      triggerAlert('⚠️ Right-clicking is disabled! Return within 15 seconds, or your test will be submitted.')
    }

    const devToolsDetector = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        violationCount.current += 1
        triggerAlert('⚠️ Developer tools detected! Close them immediately, or your test will be submitted.')
      }
    }

    const handleMouseMove = e => {
      const { clientX, clientY } = e
      const dx = clientX - lastPosition.current.x
      const dy = clientY - lastPosition.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 500) {
        suspiciousMovements.current += 1
        if (suspiciousMovements.current > 3) {
          triggerAlert('⚠️ Unusual cursor activity detected! Please focus on the test.')
          suspiciousMovements.current = 0
        }
      }

      lastPosition.current = { x: clientX, y: clientY }
    }

    sessionStorage.setItem('testInProgress', 'true')

    const handleBeforeUnload = e => {
      e.preventDefault()

      const message = '⚠️ Leaving or refreshing this page will result in automatic test submission!'
      e.returnValue = message

      sessionStorage.setItem('reloadAttempt', Date.now().toString())
      sessionStorage.setItem('wasFullscreen', document.fullscreenElement ? 'true' : 'false')

      if (!document.fullscreenElement) {
        sessionStorage.setItem('exitedFullscreen', 'true')
      }

      triggerAlert('⚠️ Page navigation attempted! Continue your test or it will be submitted.')
      return message
    }

    const handlePopState = () => {
      triggerAlert('⚠️ Browser navigation detected! Return to the test immediately.')
      window.history.pushState(null, document.title, window.location.href)
    }

    const handleAuxClick = e => {
      if (e.button === 1) {
        // Middle mouse button
        e.preventDefault()
        triggerAlert('⚠️ Middle-click is disabled during the test!')
      }
    }

    const checkInterval = setInterval(devToolsDetector, 1000)
    document.addEventListener('mousemove', handleMouseMove)

    document.addEventListener('selectstart', disableTextSelection)
    document.addEventListener('mousedown', e => {
      // Prevent double-click selection
      if (e.detail > 1) {
        e.preventDefault()
        return false
      }
    })

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowBlur)
    document.addEventListener('keydown', handleRestrictedActions)
    document.addEventListener('contextmenu', blockContextMenu)

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('auxclick', handleAuxClick)

    window.history.pushState(null, document.title, window.location.href)

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)

      document.body.style.userSelect = ''

      document.removeEventListener('selectstart', disableTextSelection)
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('keydown', handleRestrictedActions)
      document.removeEventListener('contextmenu', blockContextMenu)
      clearInterval(checkInterval)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('auxclick', handleAuxClick)
    }
  }, [])

  useEffect(() => {
    const reloadAttempt = sessionStorage.getItem('reloadAttempt')
    const testInProgress = sessionStorage.getItem('testInProgress')
    const exitedFullscreen = sessionStorage.getItem('exitedFullscreen') === 'true'

    if (testInProgress === 'true' && (reloadAttempt || exitedFullscreen)) {
      // Track violation if applicable
      if (reloadAttempt) {
        sessionStorage.removeItem('reloadAttempt')

        const violationCountStr = sessionStorage.getItem('violationCount') || '0'
        const violations = parseInt(violationCountStr, 10) + 1
        sessionStorage.setItem('violationCount', violations.toString())
      }

      setTimeout(() => {
        if (document.documentElement.requestFullscreen) {
          document.documentElement
            .requestFullscreen()
            .then(() => {
              if (reloadAttempt) {
                setAlertMessage(`⚠️ Page reload detected! Violation has been recorded.`)
              } else {
                setAlertMessage(`⚠️ You must remain in fullscreen mode for this test!`)
              }
              setShowAlert(true)
              sessionStorage.removeItem('exitedFullscreen')
            })
            .catch(err => {
              console.error('Failed to restore fullscreen after reload:', err)

              // If fullscreen fails, record a violation
              const violationCountStr = sessionStorage.getItem('violationCount') || '0'
              const violations = parseInt(violationCountStr, 10) + 1
              sessionStorage.setItem('violationCount', violations.toString())

              // Show a strong warning instead of redirecting
              setAlertMessage(
                `⚠️ CRITICAL: Fullscreen mode is required. Your violation has been recorded (${violations}).`
              )
              setShowAlert(true)

              // Try again after a short delay
              setTimeout(() => {
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen().catch(e => {
                    console.error('Second attempt to restore fullscreen failed:', e)
                  })
                }
              }, 2000)
            })
        }
      }, 500)
    }
  }, [])

  const enableFullScreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
        setShowAlert(false)
        sessionStorage.setItem('testInProgress', 'true')
        sessionStorage.setItem('wasFullscreen', 'true')
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
