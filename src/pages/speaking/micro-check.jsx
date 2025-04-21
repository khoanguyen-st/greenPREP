import { AudioOutlined, SoundOutlined } from '@ant-design/icons'
import { useAudioPlayback } from '@shared/lib/hooks/useAudioPlayback'
import { useAudioRecording } from '@shared/lib/hooks/useAudioRecording'
import { useMicrophoneAccess } from '@shared/lib/hooks/useMicrophoneAccess'
import AudioVisual from '@shared/ui/audio-visual'
import useAntiCheat from '@shared/utils/antiCheat'
import { Button } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

const MicrophoneCheck = () => {
  const navigate = useNavigate()
  const [showStartScreen, setShowStartScreen] = useState(true)
  const microphoneStatus = useMicrophoneAccess()
  const { enableFullScreen } = useAntiCheat()
  const { isRecording, audioBlob, countdown, startRecording, setAudioBlob } = useAudioRecording()

  const { isPlaying, playRecording, audioPlayerRef } = useAudioPlayback(audioBlob)

  const startCheck = useCallback(() => {
    setShowStartScreen(false)
    startRecording()
  }, [startRecording])

  const resetTest = useCallback(() => {
    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.currentTime = 0
    }
    setAudioBlob(null)
    setShowStartScreen(true)
  }, [audioPlayerRef, isPlaying, setAudioBlob])

  const playButtonIcon = useMemo(() => {
    if (isPlaying) {
      return <SoundOutlined className="text-6xl text-gray-500" />
    }
    return (
      <div className="-mr-4 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 40L28 52L28 28L52 40Z" fill="#6B7280" stroke="#6B7280" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }, [isPlaying])
  const handleStart = useCallback(async () => {
    await enableFullScreen()
    navigate('/speaking/test/1')
  }, [enableFullScreen])
  const renderContent = useCallback(() => {
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
            <Button
              type="primary"
              size="large"
              onClick={startCheck}
              className="h-10 min-w-[120px] bg-[#003087] hover:!bg-[#002b6c]"
            >
              Start check
            </Button>
          </div>
        </div>
      )
    }

    if (isRecording) {
      return (
        <>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Speak for {countdown} seconds...</h2>
            <p className="mb-6 text-gray-600">As you speak we will record your voice and check its quality.</p>
          </div>
          <div className="mx-auto h-80 w-full max-w-4xl overflow-hidden p-3">
            <AudioVisual />
          </div>
        </>
      )
    }

    if (audioBlob) {
      return (
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Thanks...</h2>
          <p className="mb-6 text-gray-600">
            Please replay the recording and check if it sounds good. If you are happy with the quality, then we are
            ready to get started, otherwise you can adjust your microphone settings and try again.
          </p>
          <div className="flex flex-col items-center">
            <CircleButton icon={playButtonIcon} onClick={playRecording} />
            <div className="mt-8 flex justify-center gap-4">
              <Button size="large" onClick={resetTest}>
                Try Again
              </Button>
              <Button type="primary" size="large" onClick={handleStart} className="bg-[#003087] hover:!bg-[#002b6c]">
                Start Test
              </Button>
            </div>
          </div>
        </div>
      )
    }

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
  }, [
    showStartScreen,
    isRecording,
    audioBlob,
    countdown,
    microphoneStatus,
    startCheck,
    startRecording,
    playRecording,
    resetTest,
    navigate,
    playButtonIcon,
    handleStart
  ])

  return (
    <div className="fixed inset-0 bg-gray-100">
      <div className="flex min-h-screen items-center justify-center">
        <div className="px-26 mx-4 w-full max-w-6xl rounded-lg bg-white py-24 shadow-lg">
          <div className="flex h-[400px] flex-col items-center justify-center">
            <div className="text-center">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MicrophoneCheck
