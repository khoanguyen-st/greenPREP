import { useState, useRef } from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const audioRef = useRef(null)

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      setHasPlayed(true)
    } else {
      if (!hasPlayed) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setHasPlayed(true)
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        type="primary"
        shape="circle"
        icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        onClick={handlePlayPause}
        disabled={hasPlayed}
      />
      <span className="text-lg font-semibold">Play/Stop</span>
      <audio ref={audioRef} src={src} onEnded={handleEnded} preload="auto" />
    </div>
  )
}

const PlayStopButton = () => {
  return (
    <div className="max-w-4xl">
      <div className="flex space-x-4">
        <AudioPlayer src="https://res.cloudinary.com/dr2vtmfqf/video/upload/v1742551809/ohtbqipzffpwjs1sfdd5.mp3" />
        <AudioPlayer src="https://res.cloudinary.com/dr2vtmfqf/video/upload/v1742551809/ohtbqipzffpwjs1sfdd5.mp3" />
      </div>
    </div>
  )
}

export default PlayStopButton
