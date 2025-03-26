import { useState, useRef, useEffect } from 'react'
import { Button, Slider } from 'antd'
import { CaretRightOutlined, PauseOutlined, SoundFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const AUDIO = {
  path: 'src/assets/Sounds/Headphone-check-test.mp3',
  initialVolume: 50
}
//const navigate = useNavigate()

//navigate('/writing/test')

const HeadphoneCheck = ({ onStart }) => {
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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-left">
        <h4 className="font-medium text-gray-800">
          Headphone Check <span className="text-red-500">*</span>
        </h4>
        <div className="mt-2 flex max-w-md items-center space-x-4 rounded-md bg-gray-100 p-2">
          <Button
            onClick={togglePlay}
            type="text"
            shape="circle"
            className="p-1 transition-all hover:scale-110 hover:bg-blue-100 hover:!text-[#1890ff]"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            icon={isPlaying ? <PauseOutlined className="text-2xl" /> : <CaretRightOutlined className="text-2xl" />}
          />
          <div className="flex-grow">
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              tooltip={{ formatter: value => `${value}%` }}
              className="w-full hover:[&_.ant-slider-handle]:border-blue-600 [&_.ant-slider-rail]:bg-slate-100 [&_.ant-slider-track]:bg-blue-500 hover:[&_.ant-slider-track]:bg-blue-600"
            />
          </div>
          <SoundFilled className="text-xl text-gray-600" />
        </div>
      </div>

      <div className="text-center">
        <Button
          //onClick={}
          type="primary"
          className="h-14 w-full max-w-xs rounded border-2 !border-[#0A3B8C] !bg-[#0A3B8C] text-lg font-bold text-white transition-colors duration-200 hover:!border-[#FFA500] hover:!bg-white hover:!text-[#1890ff]"
        >
          Start
        </Button>
      </div>
    </div>
  )
}
export default HeadphoneCheck
