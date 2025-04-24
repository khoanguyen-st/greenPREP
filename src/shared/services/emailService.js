import axiosInstance from '@shared/config/axios'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sendTestSubmissionEmail = async (userId, testData, retryCount = 0) => {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('Authentication required')
    }

    const response = await axiosInstance.post(`/send-email/${userId}`, testData)

    return response.data
  } catch (error) {
    console.error('Email request failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })

    if (error.response?.status === 500 && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount)
      await sleep(delay)
      return sendTestSubmissionEmail(userId, testData, retryCount + 1)
    }

    // Store minimal failed attempt data
    try {
      const failedAttempts = JSON.parse(localStorage.getItem('failedEmails') || '[]')
      failedAttempts.push({
        userId
      })
      if (failedAttempts.length > 50) {
        failedAttempts.shift()
      }
      localStorage.setItem('failedEmails', JSON.stringify(failedAttempts))
    } catch (e) {
      console.error('Failed to store retry data:', e)
    }

    throw new Error(
      error.response?.status === 500
        ? 'Server temporarily unavailable. Your test has been saved.'
        : 'Failed to send confirmation email.'
    )
  }
}

// Background retry mechanism
export const retryFailedEmails = async () => {
  try {
    const failedAttempts = JSON.parse(localStorage.getItem('failedEmails') || '[]')
    if (failedAttempts.length === 0) {
      return
    }

    const results = await Promise.allSettled(
      failedAttempts.map(async attempt => {
        try {
          await sendTestSubmissionEmail(attempt.userId, attempt.testData)
          return { success: true, timestamp: attempt.timestamp }
        } catch (error) {
          return { success: false, timestamp: attempt.timestamp, error: error.message }
        }
      })
    )

    // Remove successful attempts
    const remainingAttempts = failedAttempts.filter(attempt => {
      const result = results.find(r => r.status === 'fulfilled' && r.value?.timestamp === attempt.timestamp)
      return !(result?.status === 'fulfilled' && result.value?.success)
    })

    localStorage.setItem('failedEmails', JSON.stringify(remainingAttempts))
  } catch (error) {
    console.error('Failed to process retry queue:', error)
  }
}

export const handleEmailError = async error => {
  console.error('Email sending failed:', error)

  // Handle specific error cases
  if (error.response?.status === 401) {
    throw new Error('Authentication failed. Please log in again.')
  } else if (error.response?.status === 403) {
    throw new Error('You do not have permission to send emails.')
  } else if (error.response?.status === 429) {
    throw new Error('Too many email requests. Please try again later.')
  } else if (error.response?.status === 500) {
    const errorMessage = error.response.data?.message || 'Server error occurred'
    if (errorMessage.includes('Invalid login') || errorMessage.includes('WebLoginRequired')) {
      throw new Error('Email service authentication failed. Please contact support.')
    }
  } else if (error.code === 'ECONNABORTED') {
    throw new Error('Request timed out. Please check your connection and try again.')
  }
  throw new Error(error.message || 'Failed to send confirmation email')
}
