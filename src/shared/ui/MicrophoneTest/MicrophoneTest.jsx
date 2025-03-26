import { useState, useRef, useEffect } from 'react'
import { Button, Progress, message } from 'antd'
import { AudioOutlined, SoundOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AudioVisual from '@shared/ui/Audio/AudioVisual'

const MicrophoneTest = () => {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [microphoneStatus, setMicrophoneStatus] = useState('disconnected')
  const [countdown, setCountdown] = useState(5)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showStartScreen, setShowStartScreen] = useState(true)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const countdownTimerRef = useRef(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const streamRef = useRef(null)
  const [audioStream, setAudioStream] = useState(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicrophoneStatus('connected'))
      .catch(() => {
        setMicrophoneStatus('disconnected')
        message.error('Please allow microphone access to continue.')
      })
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startCheck = () => {
    setShowStartScreen(false)
    startRecording()
  }

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        setAudioStream(stream)
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data)
        }
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          setAudioBlob(audioBlob)
          audioChunksRef.current = []
        }
        mediaRecorderRef.current.start()
        setIsRecording(true)
        setCountdown(5)

        countdownTimerRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownTimerRef.current)
              stopRecording()
              return 0
            }
            return prev - 1
          })
        }, 1000)

        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)
        analyser.fftSize = 32
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray)
          const level = Math.max(...dataArray)
          setAudioLevel(level)
          if (mediaRecorderRef.current?.state === 'recording') {
            requestAnimationFrame(updateAudioLevel)
          }
        }
        updateAudioLevel()
      })
      .catch(handleError)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setAudioStream(null)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }

  const playRecording = () => {
    if (audioBlob) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      const newAudioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(newAudioUrl)
      const audio = new Audio(newAudioUrl)
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
      audio.play()
    }
  }

  const handleError = error => {
    message.error(error?.message || 'An error occurred with the microphone')
  }

  const resetTest = () => {
    setAudioBlob(null)
    setIsPlaying(false)
    setShowStartScreen(true)
  }

  const CircleButton = ({ icon, onClick, disabled = false }) => (
    <div className="flex justify-center">
      <button
        className={`flex h-36 w-36 items-center justify-center rounded-full border-4 border-solid border-gray-300 bg-gray-100 focus:outline-none ${
          disabled ? 'cursor-not-allowed opacity-70' : 'hover:bg-gray-200 active:bg-gray-300'
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </button>
    </div>
  )

  const renderContent = () => {
    if (showStartScreen) {
      return (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Before we get started, let&apos;s test your microphone.
          </h2>
          <p className="mb-12 text-base text-gray-600">
            It&apos;s important to make sure we can hear you clearly so we can mark your response.
          </p>
          <CircleButton
            icon={<AudioOutlined className="text-5xl text-gray-500" />}
            onClick={() => {}}
            disabled={true}
          />
          <div className="mt-12">
            <Button type="primary" onClick={startCheck} className="h-10 min-w-[120px] bg-blue-800 hover:bg-blue-900">
              Start check
            </Button>
          </div>
        </div>
      )
    }
    if (isRecording) {
      return (
        <div className="text-center">
          <h2 className="mb-2 text-lg font-bold">Speak for {countdown} seconds...</h2>
          <p className="mb-6 text-gray-600">As you speak we will record your voice and check its quality.</p>
          <div className="mx-auto w-[95%] max-w-4xl rounded-lg p-3">
            <AudioVisual waveColor="#6A9C89" />
          </div>
        </div>
      )
    } else if (audioBlob) {
      return (
        <div className="text-center">
          <h2 className="mb-2 text-lg font-bold">Thanks...</h2>
          <p className="mb-6 text-gray-600">
            Please replay the recording and check if it sounds good. If you are happy with the quality, then we are
            ready to get started, otherwise you can adjust your microphone settings and try again.
          </p>
          <CircleButton
            icon={
              isPlaying ? (
                <SoundOutlined className="text-6xl text-gray-500" />
              ) : (
                <div className="-mr-4 flex items-center justify-center">
                  <svg width="200" height="200" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M52 40L28 52L28 28L52 40Z"
                      fill="#6B7280"
                      stroke="#6B7280"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )
            }
            onClick={playRecording}
          />
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={resetTest}>Try Again</Button>
            <Button type="primary" onClick={() => navigate('/speaking/test')}>
              Start Test
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Speak for 5 seconds...</h2>
          <p className="mb-12 text-base text-gray-600">As you speak we will record your voice and check its quality.</p>
          <CircleButton
            icon={<AudioOutlined className="text-5xl text-gray-500" />}
            onClick={startRecording}
            disabled={microphoneStatus === 'disconnected'}
          />
        </div>
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-100">
      <div className="flex min-h-screen items-center justify-center">
        <div className="px-26 mx-4 w-full max-w-6xl rounded-lg bg-white py-24 shadow-lg">
          <div className="text-center">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default MicrophoneTest
