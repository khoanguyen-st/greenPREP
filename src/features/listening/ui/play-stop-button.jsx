import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState, useRef, useEffect } from 'react'

const STORAGE_KEY = 'listening_played_questions'

const getPlayedQuestions = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

const savePlayedQuestions = questions => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
}

const playedQuestions = getPlayedQuestions()

const AudioPlayer = ({ src, id, questionId, playAttempt, onPlayingChange, isOtherPlaying, setIsOtherPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const isPlayingRef = useRef(false)

  useEffect(() => {
    setIsPlaying(false)
    isPlayingRef.current = false
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [src])

  useEffect(() => {
    onPlayingChange?.(isPlaying)
  }, [isPlaying, onPlayingChange])

  useEffect(() => {
    if (isOtherPlaying && isPlayingRef.current) {
      audioRef.current?.pause()
      setIsPlaying(false)
      isPlayingRef.current = false
    }
  }, [isOtherPlaying])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      isPlayingRef.current = false
      setIsOtherPlaying(false)
    } else if (!playedQuestions[questionId]?.[playAttempt]) {
      setIsOtherPlaying(true)
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          isPlayingRef.current = true
          if (!playedQuestions[questionId]) {
            playedQuestions[questionId] = {}
          }
          playedQuestions[questionId][playAttempt] = true
          savePlayedQuestions(playedQuestions)
        })
        .catch(error => console.error('Audio playback failed:', error))
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    isPlayingRef.current = false
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
