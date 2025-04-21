import { SubmissionImage } from '@assets/images'
import { createSelector } from '@reduxjs/toolkit'
import { useTestSubmissionEmail } from '@shared/hooks/useTestSubmissionEmail'
import { Button, message, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

// Create memoized selector
const selectUser = createSelector([state => state.auth?.user], user => ({
  id: user?.id,
  email: user?.email,
  name: user?.name,
  fullUser: user
}))

const { Title } = Typography

const SubmissionPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const { sendConfirmationEmail, isSending, error: emailError } = useTestSubmissionEmail()
  const user = useSelector(selectUser)
  const [emailSent, setEmailSent] = useState(false)

  const globalData = JSON.parse(localStorage.getItem('globalData'))
  const sessionName = globalData?.sessionName

  useEffect(() => {
    const sendEmail = async () => {
      try {
        if (!user?.email || !user?.fullUser?.userId || !globalData) {
          return
        }

        // ... existing code ...
        const testData = {
          sessionName: sessionName,
          testDetails: `Submission date and time: ${new Date().toLocaleString()}<br>
          Confirmation message: Your test has been successfully submitted and recorded in our system.`,
          nextSteps: 'Please wait for the final results. You will be notified once they are available.',
          contactInfo: 'support@greenprep.edu.vn'
        }

        // Store submission data in localStorage for retry
        const submissionData = {
          userId: user.fullUser.userId,
          testData,
          timestamp: new Date().toISOString()
        }
        localStorage.setItem('pendingEmailSubmission', JSON.stringify(submissionData))

        try {
          await sendConfirmationEmail(user.fullUser.userId, testData)
          setEmailSent(true)
          message.success('Test submitted and confirmation email sent successfully!')
          localStorage.removeItem('pendingEmailSubmission')
          localStorage.removeItem('globalData')
          localStorage.removeItem('key')
        } catch (error) {
          console.error('Failed to send email:', error)
          // Show a more user-friendly message
          message.info({
            content: (
              <div>
                <p>Your test has been submitted successfully!</p>
                <p className="mt-1 text-sm text-gray-500">
                  We will send you a confirmation email when our system is available. Your submission is saved and
                  secure.
                </p>
              </div>
            ),
            duration: 6
          })
          // Still mark as sent to avoid retry attempts in this session
          setEmailSent(true)
        }
      } catch (error) {
        console.error('Error in submission process:', error)
        setError(error.message)

        message.error({
          content:
            'Your test was submitted but we could not send the confirmation email. Please contact support if needed.',
          duration: 5
        })
      }
    }
    sendEmail()
  }, [user, location.state, sendConfirmationEmail, sessionName])

  const handleNavigation = async () => {
    try {
      const keysToRemove = ['key', 'globalData']
      keysToRemove.forEach(key => localStorage.removeItem(key))
      navigate('/')
    } catch (err) {
      setError(err.message)
      message.error('Navigation failed. Please try again.')
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex flex-col pb-10 text-black sm:flex-row">
        <AiOutlineCheckCircle className="mx-auto text-8xl text-green-500" />
        <div className="items-center justify-center text-center sm:text-left">
          <Title level={2} className="text-3xl font-bold" style={{ marginBottom: 0, marginTop: 12 }}>
            You Finished Your Exam
          </Title>
          <p className="text-xs text-gray-700 sm:text-xl">
            Your teacher will release your results shortly. All the best <span className="text-red-500">❤️</span>!
          </p>
          <div className="mt-2 flex items-center gap-2">
            {isSending ? (
              <>
                <Spin size="small" />
                <p className="text-sm text-gray-500">Sending confirmation email...</p>
              </>
            ) : emailSent ? (
              <p className="text-sm text-green-500">Your test has been submitted successfully!</p>
            ) : emailError ? (
              <p className="text-sm text-red-500">Failed to send confirmation email</p>
            ) : (
              <p className="text-sm text-gray-500">
                A confirmation email will be sent to your registered email address.
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="primary"
        className="mt-6 flex h-14 items-center gap-3 bg-[#003087] px-6 py-2 text-sm text-white hover:!bg-[#002b6c] md:text-base"
        onClick={handleNavigation}
      >
        Home <span>&rarr;</span>
      </Button>
      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error} <br />
          <Button type="link" onClick={handleNavigation}>
            Retry
          </Button>
        </p>
      )}

      {<img src={SubmissionImage} alt="submission" className="mt-6 w-full sm:w-1/2 md:w-2/5" />}
    </div>
  )
}

export default SubmissionPage
