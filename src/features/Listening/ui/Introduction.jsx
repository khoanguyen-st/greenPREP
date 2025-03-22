'use client'
import { useState, useRef, useEffect } from 'react'
import { Button, Slider } from 'antd'
import { CaretRightOutlined, PauseOutlined, SoundFilled } from '@ant-design/icons'

const Introduction = ({ onStart }) => {
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('src/assets/Sounds/Headphone-check-test.mp3')
    audioRef.current.loop = true

    console.log('Audio element initialized with src:', audioRef.current.src)

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
      <div className="mb-12 text-center">
        <h1 className="mb-8 text-4xl font-bold text-[#0A3B8C]">GreenPREP</h1>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800">Aptis General Practice Test</h2>
          <h3 className="text-xl font-bold text-gray-800">Listening</h3>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-8">
          <div className="text-left">
            <h4 className="font-medium text-gray-800">Number of Questions</h4>
            <p className="text-gray-700">17</p>
          </div>
          <div className="text-left">
            <h4 className="font-medium text-gray-800">Time Allowed</h4>
            <p className="text-gray-700">40 mins</p>
          </div>
        </div>

        <div className="mb-4 text-left">
          <h4 className="font-medium text-gray-800">Assessment Description</h4>
          <p className="text-sm text-gray-600">This is a practice test for the Aptis General Listening section.</p>
        </div>

        <div className="mb-8 text-left">
          <h4 className="font-medium text-gray-800">Form Description</h4>
          <p className="text-sm text-gray-600">
            You will hear various recordings and answer questions based on what you hear.
          </p>
        </div>

        <div className="mb-8 text-left">
          <h4 className="font-medium text-gray-800">
            Headphone Check <span className="text-red-500">*</span>
          </h4>
          <div className="mt-2 flex max-w-md items-center space-x-4 rounded-md bg-gray-100 p-2">
            <button
              onClick={togglePlay}
              className="rounded-full border-0 p-1 transition-all hover:scale-110 hover:bg-blue-100"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseOutlined style={{ fontSize: '24px' }} />
              ) : (
                <CaretRightOutlined style={{ fontSize: '24px' }} />
              )}
            </button>
            <div className="flex-grow">
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
                tooltip={{ formatter: value => `${value}%` }}
                styles={{
                  track: { backgroundColor: '#1890ff' },
                  rail: { backgroundColor: '#f7fafc' }
                }}
              />
            </div>
            <SoundFilled style={{ fontSize: '20px' }} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={onStart}
          className="h-12 w-full max-w-xs rounded bg-[#0A3B8C] text-white hover:bg-[#0A3B8C]/90"
          style={{
            backgroundColor: '#0A3B8C',
            borderColor: '#0A3B8C'
          }}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

export default Introduction
