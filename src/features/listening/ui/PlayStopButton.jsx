import { useState, useRef } from 'react'
import { Button } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'

let currentPlaying = null

const AudioPlayer = ({ src, id }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const audioRef = useRef(null)

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      // Dừng audio
      audio.pause()
      setIsPlaying(false)
      setIsStopped(true)
      currentPlaying = null
    } else if (!hasPlayed && (!currentPlaying || currentPlaying === id)) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasPlayed(true)
          currentPlaying = id
        })
        .catch(error => console.error('Audio playback failed:', error))
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    currentPlaying = null
  }

  return (
    <div className="flex items-center space-x-4">
      <Button
        type="primary"
        shape="circle"
        icon={isPlaying ? <PauseCircleOutlined style={{ color: 'white' }} /> : <PlayCircleOutlined />}
        onClick={handlePlayPause}
        disabled={isStopped || (hasPlayed && !isPlaying) || (currentPlaying && currentPlaying !== id)}
        style={{ backgroundColor: isPlaying ? 'green' : undefined }}
      />
      <span>Play</span>
      <audio ref={audioRef} src={src} onEnded={handleEnded} data-id={id} />
    </div>
  )
}

const PlayStopButton = () => {
  return (
    <div className="max-w-4xl">
      <div className="flex space-x-4">
        <AudioPlayer
          src="https://res.cloudinary.com/dr2vtmfqf/video/upload/v1742790293/g3mgmrawwmwcyg4savxz.mp3"
          id="audio1"
        />
        <AudioPlayer
          src="https://res.cloudinary.com/dr2vtmfqf/video/upload/v1742790293/g3mgmrawwmwcyg4savxz.mp3"
          id="audio2"
        />
      </div>
    </div>
  )
}

export default PlayStopButton
