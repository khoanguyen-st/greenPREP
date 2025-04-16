import { useState, useCallback } from 'react'

import { sendTestSubmissionEmail, handleEmailError } from '../services/emailService'

export const useTestSubmissionEmail = () => {
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')

  const sendConfirmationEmail = useCallback(async (userId, testData) => {
    setIsSending(true)
    setError(null)
    setSuccess(false)
    setRetryCount(0)
    setStatusMessage('Preparing to send confirmation email...')

    try {
      // Validate required data
      if (!userId || !testData) {
        throw new Error('Missing required data for email confirmation')
      }

      setStatusMessage('Validating email data...')
      const emailData = {
        ...testData // Unique identifier for the submission
      }

      setStatusMessage('Sending email...')
      const response = await sendTestSubmissionEmail(userId, emailData)

      if (response) {
        setSuccess(true)
        setStatusMessage('Email sent successfully!')
      } else {
        throw new Error('No response from email service')
      }
    } catch (error) {
      console.error('Email sending error:', error)
      setError(error.message)
      setRetryCount(prev => prev + 1)
      setStatusMessage(`Error: ${error.message}`)
      await handleEmailError(error)
    } finally {
      setIsSending(false)
    }
  }, [])

  return {
    sendConfirmationEmail,
    isSending,
    error,
    success,
    retryCount,
    statusMessage
  }
}
