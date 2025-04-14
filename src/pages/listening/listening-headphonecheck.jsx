import { CaretRightOutlined, PauseOutlined, SoundFilled } from '@ant-design/icons'
import { headphoneCheck } from '@assets/sounds'
import { Button, Slider } from 'antd'
import { useState, useRef, useEffect } from 'react'

const AUDIO = {
  path: headphoneCheck,
  initialVolume: 50
}

const HeadphoneCheck = () => {
  const [volume, setVolume] = useState(AUDIO.initialVolume)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio(AUDIO.path)
    audioRef.current.loop = true
    audioRef.current.addEventListener('error', e => {
      console.error('Audio error:', e)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handleVolumeChange = value => {
    setVolume(value)
  }
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch(error => {
              console.error('Audio playback failed:', error)
              setIsPlaying(false)
            })
        } else {
          setIsPlaying(true)
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-0 md:pt-32">
      <div className="flex flex-col items-center space-y-4 p-2">
        <SoundFilled className="text-xl text-gray-600" />
        <Slider
          vertical
          value={volume}
          onChange={handleVolumeChange}
          tooltip={{ formatter: value => `${value}%` }}
          className="h-40 hover:[&_.ant-slider-handle]:border-blue-600 [&_.ant-slider-rail]:bg-slate-100 [&_.ant-slider-track]:bg-blue-500 hover:[&_.ant-slider-track]:bg-blue-600"
        />
        <Button
          onClick={togglePlay}
          type="text"
          shape="circle"
          className="bg-[#FFC700] p-1 !text-[#2D5BFF] transition-all hover:scale-110 hover:bg-orange-600"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <PauseOutlined className="text-2xl" /> : <CaretRightOutlined className="text-2xl" />}
        />
      </div>
    </div>
  )
}
export default HeadphoneCheck
