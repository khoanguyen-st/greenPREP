import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { uploadToCloudinary } from '../../api'

/**
 * Part component expects:
 * - data: API data containing the part details and questions.
 * - timePairs: an array of objects with "read" and "answer" keys in "mm:ss" format.
 *   For example: [{ read: "01:11", answer: "02:00" }]
 */
const Part = ({ data, timePairs = [{ read: '00:03', answer: '00:15' }], onNextPart }) => {
  const navigate = useNavigate()

  const parseTime = timeStr => {
    const [min, sec] = timeStr.split(':').map(Number)
    return min * 60 + sec
  }
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  const formatTimeSec = seconds => seconds % 60

  const questions = data.Questions || []
  const totalQuestions = questions.length
  const getTimePair = index => timePairs[index] || timePairs[timePairs.length - 1] || { read: '00:03', answer: '00:15' }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [phase, setPhase] = useState('reading')
  const [countdown, setCountdown] = useState(parseTime(getTimePair(0).read))
  const [isActive, setIsActive] = useState(true)
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [nextQuestionInfo, setNextQuestionInfo] = useState(null)
  const [mediaRecorderRef, setMediaRecorderRef] = useState(null)
  const [streamRef, setStreamRef] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [hasUploaded, setHasUploaded] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop())
      }
      if (mediaRecorderRef?.state === 'recording') {
        mediaRecorderRef.stop()
      }
    }
  }, [streamRef, mediaRecorderRef])

  // Stop recording when switching questions
  useEffect(() => {
    if (mediaRecorderRef?.state === 'recording') {
      mediaRecorderRef.stop()
      streamRef?.getTracks().forEach(track => track.stop())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex])

  const resetStates = () => {
    setIsRecording(false)
    setMediaRecorderRef(null)
    setStreamRef(null)
    setIsTimerRunning(true)
    setHasUploaded(false)
  }

  const startRecording = duration => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        setMediaRecorderRef(mediaRecorder)
        setStreamRef(stream)
        const chunks = []
        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data)
        }
        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          if (!hasUploaded) {
            try {
              await uploadToCloudinary(blob, data.TopicID, data.Content, currentQuestionIndex)
              setHasUploaded(true)
            } catch (error) {
              console.error('Failed to upload recording:', error)
            }
          }
          stream.getTracks().forEach(track => track.stop())
        }
        mediaRecorder.start()
        setIsRecording(true)
        setHasUploaded(false)

        setTimeout(() => {
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop()
            setIsRecording(false)
          }
        }, duration * 1000)
      })
      .catch(err => console.error('Error accessing microphone:', err))
  }

  const handleStoreRecording = () => {
    if (mediaRecorderRef && mediaRecorderRef.state === 'recording') {
      mediaRecorderRef.stop()
      streamRef?.getTracks().forEach(track => track.stop())
      setIsRecording(false)

      setPhase('reading')
      setCountdown(0)
      setIsActive(false)
      setIsTimerRunning(false)
      clearInterval(timerRef.current)

      if (currentQuestionIndex < totalQuestions - 1) {
        const nextIndex = currentQuestionIndex + 1
        setNextQuestionInfo({
          currentQuestion: currentQuestionIndex + 1,
          nextQuestion: nextIndex + 1,
          readTime: formatTime(parseTime(getTimePair(nextIndex).read))
        })
        setShowModal(true)
      } else {
        setShowSubmitButton(true)
      }
    }
  }

  const handleSubmitRecording = () => {
    setShowModal(true)
    setNextQuestionInfo(null)

    setTimeout(() => {
      setShowModal(false)
      if (currentQuestionIndex < totalQuestions - 1) {
        resetStates()
        setCurrentQuestionIndex(prev => prev + 1)
        setPhase('reading')
        setCountdown(parseTime(getTimePair(currentQuestionIndex + 1).read))
        setShowSubmitButton(false)
      } else {
        if (data.Content === 'PART 4') {
          navigate('/listening')
        } else {
          if (onNextPart) {
            onNextPart()
          }
        }
      }
    }, 2000)
  }

  useEffect(() => {
    if (phase === 'answering' && !isRecording) {
      const answerDuration = parseTime(getTimePair(currentQuestionIndex).answer)
      startRecording(answerDuration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isRecording, currentQuestionIndex])

  useEffect(() => {
    if (currentQuestionIndex >= totalQuestions || !isTimerRunning) {
      return
    }

    if (countdown <= 0) {
      if (phase === 'reading') {
        setPhase('answering')
        const answerTime = parseTime(getTimePair(currentQuestionIndex).answer)
        setCountdown(answerTime)
      } else if (phase === 'answering' && !showModal) {
        if (currentQuestionIndex < totalQuestions - 1) {
          const nextIndex = currentQuestionIndex + 1
          setNextQuestionInfo({
            currentQuestion: currentQuestionIndex + 1,
            nextQuestion: nextIndex + 1,
            readTime: formatTime(parseTime(getTimePair(nextIndex).read))
          })
          setShowModal(true)
        } else if (currentQuestionIndex >= totalQuestions - 1) {
          setShowSubmitButton(true)
        }
      }
      return
    }

    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, phase, currentQuestionIndex, totalQuestions, timePairs, showModal, isTimerRunning])

  const handleMicClick = () => {
    if (phase === 'answering' || isRecording) {
      return
    }
    setPhase('answering')
    const answerDuration = parseTime(getTimePair(currentQuestionIndex).answer)
    setCountdown(answerDuration)
    startRecording(answerDuration)
  }

  const currentQuestion = questions[currentQuestionIndex]

  const hasImage = data.Content === 'PART 2' || data.Content === 'PART 3' || data.Content === 'PART 4'

  const imageUrl =
    hasImage && currentQuestion && (currentQuestion.ImageKeys?.[0] || currentQuestion.AnswerContent?.imageKeys?.[0])

  const handleModalOk = () => {
    if (nextQuestionInfo) {
      const nextIndex = nextQuestionInfo.nextQuestion - 1
      resetStates()
      setCurrentQuestionIndex(nextIndex)
      setPhase('reading')
      setCountdown(parseTime(getTimePair(nextIndex).read))
      setShowModal(false)
      setNextQuestionInfo(null)
    }
  }

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex h-screen w-full flex-row rounded-xl bg-white">
      <div className="pl-28 pt-28 sm:w-1/2 lg:w-2/3">
        <h1 className="mb-6 text-4xl font-bold text-[#003087]">{data?.Content || 'Speaking Test'}</h1>
        {data?.SubContent && <h2 className="mb-9 text-2xl font-bold">{data.SubContent}</h2>}
        {hasImage && imageUrl && (
          <div className="mb-10">
            <img
              src={imageUrl}
              alt="Question visual"
              className="h-[400px] max-w-full rounded object-contain shadow-lg"
            />
          </div>
        )}
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
      {/* Right Panel: Timer and Audio Control */}
      <div className="min-h-3/4 mx-8 my-6 rounded-3xl border-2 border-solid border-[#003087] shadow-[10px_10px_4px_rgba(0,48,135,0.25)] sm:w-1/2 lg:w-1/3">
        <span className="m-10 flex justify-center text-5xl font-normal">
          {phase === 'reading' ? 'Instruction...' : 'Recording...'}
        </span>
        <div className="flex flex-col items-center justify-center bg-transparent">
          {phase === 'reading' ? (
            <button
              onClick={() => {
                setIsActive(!isActive)
                handleMicClick()
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
          {phase === 'answering' && formatTimeSec(countdown) < 20 && (
            <button
              className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-lg font-bold text-white transition hover:bg-green-700"
              onClick={handleStoreRecording}
            >
              Submit Recording
            </button>
          )}
        </div>
        {showSubmitButton && (
          <div className="mt-8 flex justify-center">
            <button
              className="rounded-lg bg-blue-600 px-6 py-3 text-xl font-bold text-white transition hover:bg-blue-700"
              onClick={handleSubmitRecording}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Next Part' : 'Submit Recording'}
            </button>
          </div>
        )}
      </div>

      <Modal
        title="Question Switch"
        open={showModal}
        onOk={handleModalOk}
        okText="Continue"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <p className="text-lg">Question {nextQuestionInfo?.currentQuestion} has ended.</p>
        <p className="text-lg">
          You have {nextQuestionInfo?.readTime} to read Question {nextQuestionInfo?.nextQuestion}.
        </p>
      </Modal>
    </div>
  )
}

export default Part
