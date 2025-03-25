import { useState, useRef, useEffect } from 'react'
import { Button, Progress, message } from 'antd'
import { AudioOutlined, SoundOutlined } from '@ant-design/icons'

const MicrophoneTest = () => {
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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicrophoneStatus('connected'))
      .catch(() => {
        setMicrophoneStatus('disconnected')
        message.error('Please allow microphone access to continue.')
      })
  }, [])

  const startCheck = () => {
    setShowStartScreen(false)
  }

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
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
          if (isRecording) requestAnimationFrame(updateAudioLevel)
        }
        updateAudioLevel()
      })
      .catch(() => {
        handleError()
      })
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)
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

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes rotate {
        0% {
          background-image: linear-gradient(white, white), linear-gradient(0deg, #60a5fa, #e879f9);
        }
        25% {
          background-image: linear-gradient(white, white), linear-gradient(90deg, #60a5fa, #e879f9);
        }
        50% {
          background-image: linear-gradient(white, white), linear-gradient(180deg, #60a5fa, #e879f9);
        }
        75% {
          background-image: linear-gradient(white, white), linear-gradient(270deg, #60a5fa, #e879f9);
        }
        100% {
          background-image: linear-gradient(white, white), linear-gradient(360deg, #60a5fa, #e879f9);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  const CircleButton = ({ icon, onClick, disabled = false }) => (
    <div className="flex justify-center">
      <button
        className={`flex h-36 w-36 items-center justify-center rounded-full border-[6px] border-gray-300 bg-gray-100 focus:outline-none ${
          disabled ? 'cursor-not-allowed opacity-70' : 'hover:bg-gray-200 active:bg-gray-300'
        } ${isRecording ? 'animate-border-rainbow background-animate border-transparent' : ''}`}
        style={
          isRecording
            ? {
                backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #60a5fa, #e879f9)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                animation: 'rotate 2s linear infinite'
              }
            : {}
        }
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
          <div className="relative inline-block">
            <CircleButton
              icon={<AudioOutlined className="text-4xl text-gray-500" />}
              onClick={() => {}}
              disabled={true}
            />
            <div className="absolute -bottom-5 left-1/2 w-32 -translate-x-1/2 transform">
              <Progress percent={audioLevel} showInfo={false} strokeColor="#52c41a" />
            </div>
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
            <Button type="primary">Start Test</Button>
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
