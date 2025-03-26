import { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'

const playedQuestions = {}

const AudioPlayer = ({ src, id, questionId, playAttempt, onPlayingChange, isOtherPlaying, setIsOtherPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [src])

  useEffect(() => {
    onPlayingChange?.(isPlaying)
  }, [isPlaying, onPlayingChange])

  useEffect(() => {
    if (isOtherPlaying && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }, [isOtherPlaying, isPlaying])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setIsOtherPlaying(false)
    } else if (!playedQuestions[questionId]?.[playAttempt]) {
      setIsOtherPlaying(true)
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          if (!playedQuestions[questionId]) {
            playedQuestions[questionId] = {}
          }
          playedQuestions[questionId][playAttempt] = true
        })
        .catch(error => console.error('Audio playback failed:', error))
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setIsOtherPlaying(false)
  }

  const hasPlayed = playedQuestions[questionId]?.[playAttempt] || false

  return (
    <div className="flex items-center space-x-4">
      <Button
        type="primary"
        shape="circle"
        icon={isPlaying ? <PauseCircleOutlined style={{ color: 'white' }} /> : <PlayCircleOutlined />}
        onClick={handlePlayPause}
        disabled={(hasPlayed && !isPlaying) || (isOtherPlaying && !isPlaying)}
        style={{ backgroundColor: isPlaying ? 'green' : undefined }}
      />
      <span>Play/Stop</span>
      <audio ref={audioRef} src={src} onEnded={handleEnded} data-id={id} />
    </div>
  )
}

const PlayStopButton = ({ audioUrl, questionId, onPlayingChange }) => {
  const [isOtherPlaying, setIsOtherPlaying] = useState(false)

  if (!audioUrl) {
    return null
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-row justify-start space-x-4">
        <div className="flex items-center space-x-4">
          <AudioPlayer
            src={audioUrl}
            id="audio1"
            questionId={questionId}
            playAttempt={1}
            onPlayingChange={onPlayingChange}
            isOtherPlaying={isOtherPlaying}
            setIsOtherPlaying={setIsOtherPlaying}
          />
        </div>
        <div className="flex items-center space-x-4">
          <AudioPlayer
            src={audioUrl}
            id="audio2"
            questionId={questionId}
            playAttempt={2}
            onPlayingChange={onPlayingChange}
            isOtherPlaying={isOtherPlaying}
            setIsOtherPlaying={setIsOtherPlaying}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayStopButton
