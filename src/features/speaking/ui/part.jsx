import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { uploadToCloudinary } from '../api'
import PartIntro from './part-intro'
import QuestionDisplay from './question-display'
import TimerDisplay from './timer-display'

const Part = ({ data, timePairs = [{ read: '00:03', answer: '00:15' }], onNextPart }) => {
  const navigate = useNavigate()
  const timerRef = useRef(null)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [phase, setPhase] = useState('reading')
  const [countdown, setCountdown] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorderRef, setMediaRecorderRef] = useState(null)
  const [streamRef, setStreamRef] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [hasUploaded, setHasUploaded] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const parseTime = timeStr => {
    const [min, sec] = timeStr.split(':').map(Number)
    return min * 60 + sec
  }

  const questions = data.Questions || []
  const totalQuestions = questions.length
  const getTimePair = index => {
    if (data.Content === 'PART 1') {
      return { read: '00:05', answer: '00:30' }
    } else if (data.Content === 'PART 2' || data.Content === 'PART 3') {
      return { read: '00:05', answer: '00:45' }
    } else if (data.Content === 'PART 4') {
      return { read: '01:00', answer: '02:00' }
    }
    return timePairs[index] || timePairs[timePairs.length - 1] || { read: '00:05', answer: '00:30' }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentTimePair = getTimePair(currentQuestionIndex)

  useEffect(() => {
    // Reset all states when part changes
    setShowIntro(true)
    setIsActive(false)
    setIsTimerRunning(false)
    setPhase('reading')
    setCountdown(parseTime(getTimePair(0).read))
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
  }, [data.Content])

  useEffect(() => {
    if (isActive && isTimerRunning) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            if (phase === 'reading') {
              setPhase('answering')
              setCountdown(parseTime(currentTimePair.answer))
              setIsRecording(true)
              startRecording()
            } else if (phase === 'answering') {
              setIsRecording(false)
              if (mediaRecorderRef?.state === 'recording') {
                mediaRecorderRef.stop()
              }
              setIsActive(false)
              setIsTimerRunning(false)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, isTimerRunning, phase, currentTimePair])

  const handleStartPart = () => {
    setShowIntro(false)
    setIsActive(true)
    setIsTimerRunning(true)
    setPhase('reading')
    setCountdown(parseTime(getTimePair(0).read))
  }

  if (showIntro) {
    return <PartIntro data={data} onStartPart={handleStartPart} />
  }

  const startRecording = () => {
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
        mediaRecorder.start(1000)
        setIsRecording(true)
        setHasUploaded(false)
      })
      .catch(err => console.error('Error accessing microphone:', err))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setPhase('reading')
      setCountdown(parseTime(getTimePair(currentQuestionIndex + 1).read))
      setIsActive(true)
      setIsTimerRunning(true)
      setHasUploaded(false)
    }
  }

  const handleNextPart = () => {
    if (data.Content === 'PART 4') {
      navigate('/listening')
    } else if (onNextPart) {
      onNextPart()
    }
  }

  return (
    <div className="flex h-screen w-full flex-row rounded-xl bg-white">
      <QuestionDisplay
        data={data}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onNextQuestion={handleNextQuestion}
        onNextPart={handleNextPart}
        isLastQuestion={currentQuestionIndex === totalQuestions - 1}
        showNavigation={!isRecording && countdown === 0 && phase === 'answering'}
        isPart4={data.Content === 'PART 4'}
      />
      <div className="flex h-screen w-1/3 flex-col items-center justify-center bg-gradient-to-br from-[#003087] via-[#002b6c] to-[#001f4d]">
        <h2 className="mb-4 text-4xl font-bold text-white">
          {phase === 'reading' ? 'Reading Time' : 'Recording Time'}
        </h2>
        <p className="mb-12 text-lg text-white/80">
          {phase === 'reading' ? 'Please read the question carefully' : 'Please speak clearly into your microphone'}
        </p>
        <TimerDisplay countdown={countdown} phase={phase} />
        {data.Content !== 'PART 4' && (
          <div className="mt-8 flex gap-2">
            <div className={`h-2 w-2 rounded-full ${currentQuestionIndex === 0 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`h-2 w-2 rounded-full ${currentQuestionIndex === 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`h-2 w-2 rounded-full ${currentQuestionIndex === 2 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Part
