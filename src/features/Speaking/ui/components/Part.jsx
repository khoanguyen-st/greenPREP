import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import useAntiCheat from '../../../../shared/utils/antiCheat'

/**
 * Part component expects:
 * - data: API data containing the part details and questions.
 * - timePairs: an array of objects with "read" and "answer" keys in "mm:ss" format.
 *   For example: [{ read: "01:11", answer: "02:00" }]
 */
const Part = ({ data, timePairs = [{ read: '00:10', answer: '00:30' }] }) => {
  if (!data) {
    return <div>Loading...</div>
  }

  // Helper to parse "mm:ss" into total seconds.
  const parseTime = timeStr => {
    const [min, sec] = timeStr.split(':').map(Number)
    return min * 60 + sec
  }

  // Helper to format seconds as "mm:ss"
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const questions = data.Questions || []
  const totalQuestions = questions.length

  // Returns the time pair for a given question index,
  // or falls back to the last time pair if not enough are provided.
  const getTimePair = index => timePairs[index] || timePairs[timePairs.length - 1] || { read: '00:10', answer: '00:30' }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [phase, setPhase] = useState('reading')
  // Initialize countdown with the reading time (converted to seconds) for the first question.
  const [countdown, setCountdown] = useState(parseTime(getTimePair(0).read))
  const [isActive, setIsActive] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Function to upload audio blob to Cloudinary.
  const uploadToCloudinary = blob => {
    const formData = new FormData()
    formData.append('file', blob)
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET') // Replace with your preset
    fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload', {
      // Replace with your Cloudinary cloud name
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log('Uploaded successfully:', data)
        // Handle post-upload behavior as needed.
      })
      .catch(err => console.error('Upload error:', err))
  }

  // Function to start audio recording for a given duration (in seconds)
  const startRecording = duration => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        let chunks = []
        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data)
        }
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          uploadToCloudinary(blob)
          stream.getTracks().forEach(track => track.stop())
        }
        mediaRecorder.start()
        setIsRecording(true)
        // Stop recording after the specified duration.
        setTimeout(() => {
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop()
            setIsRecording(false)
          }
        }, duration * 1000)
      })
      .catch(err => console.error('Error accessing microphone:', err))
  }

  // Automatically start recording when entering the answering phase if not already recording.
  useEffect(() => {
    if (phase === 'answering' && !isRecording) {
      const answerDuration = parseTime(getTimePair(currentQuestionIndex).answer)
      startRecording(answerDuration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isRecording, currentQuestionIndex])

  // Countdown and phase management.
  useEffect(() => {
    if (currentQuestionIndex >= totalQuestions) return

    if (countdown <= 0) {
      if (phase === 'reading') {
        // Switch to answering phase and start recording automatically.
        setPhase('answering')
        const answerTime = parseTime(getTimePair(currentQuestionIndex).answer)
        setCountdown(answerTime)
        // Recording will be triggered by the above effect.
      } else if (phase === 'answering') {
        // Finished answering this question.
        if (currentQuestionIndex < totalQuestions - 1) {
          const nextIndex = currentQuestionIndex + 1
          setCurrentQuestionIndex(nextIndex)
          setPhase('reading')
          setCountdown(parseTime(getTimePair(nextIndex).read))
        } else {
          // All questions finished; show submit button.
          setShowSubmitButton(true)
        }
      }
      return
    }

    const timerId = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [countdown, phase, currentQuestionIndex, totalQuestions, timePairs])

  // Handle mic icon click to manually trigger recording.
  const handleMicClick = () => {
    // If already in answering phase (or recording), do nothing.
    if (phase === 'answering' || isRecording) return
    // Switch to answering phase and start recording.
    setPhase('answering')
    const answerDuration = parseTime(getTimePair(currentQuestionIndex).answer)
    setCountdown(answerDuration)
    startRecording(answerDuration)
  }

  // Only display the current question.
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="flex h-screen w-full flex-row rounded-xl bg-white">
      {/* Left Panel: Display Part Information and Current Question */}
      <div className="pl-28 pt-28 sm:w-1/2 lg:w-2/3">
        <h1 className="mb-6 text-4xl font-bold text-[#003087]">{data?.Content || 'Speaking Test'}</h1>
        <div className="mb-8">
          {data?.SubContent && <h2 className="mb-9 text-2xl font-bold">{data.SubContent}</h2>}
          {currentQuestion ? (
            <>
              <p className="mb-2 text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <p className="mb-20 text-2xl">{currentQuestion.Content}</p>
            </>
          ) : (
            <p className="mb-20 text-2xl">No questions available.</p>
          )}
          <p className="text-2xl">Please answer the above question.</p>
        </div>
      </div>
      {/* Right Panel: Timer and Audio Control */}
      <div className="min-h-3/4 mx-8 my-6 rounded-3xl border-2 border-solid border-[#003087] shadow-[10px_10px_4px_rgba(0,48,135,0.25)] sm:w-1/2 lg:w-1/3">
        <span className="m-10 flex justify-center text-5xl font-normal">
          {phase === 'reading' ? 'Instruction...' : 'Recording...'}
        </span>
        <div className="flex items-center justify-center bg-transparent">
          {phase === 'reading' ? (
            <button
              onClick={() => {
                setIsActive(!isActive)
                handleMicClick() // Trigger recording if user clicks the mic icon
              }}
              className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-solid border-[#003087] bg-white shadow-[10px_10px_4px_rgba(0,48,135,0.25)] transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label={isActive ? 'Mute sound' : 'Unmute sound'}
            >
              {isActive ? (
                <AudioOutlined style={{ fontSize: '6rem', color: '#0047AB' }} />
              ) : (
                <AudioMutedOutlined style={{ fontSize: '6rem', color: '#0047AB' }} />
              )}
            </button>
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-solid border-[#003087] bg-white shadow-[10px_10px_4px_rgba(0,48,135,0.25)]">
              <span className="text-6xl font-bold text-[#003087]">{formatTime(countdown)}</span>
            </div>
          )}
        </div>
        {showSubmitButton && (
          <div className="mt-8 flex justify-center">
            <button
              className="rounded-lg bg-blue-600 px-6 py-3 text-xl font-bold text-white transition hover:bg-blue-700"
              onClick={() => alert('Your recording has been submitted!')}
            >
              Submit Recording
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Part
