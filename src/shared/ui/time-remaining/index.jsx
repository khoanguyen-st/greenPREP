import { memo, useEffect, useState, useRef } from 'react'

import formatTime from '../../utils/useCountdownTimer'

const TimeRemaining = ({ duration, label = 'Time remaining', onAutoSubmit }) => {
  const storageKey = 'timeRemainingData'
  const timerRef = useRef(null)

  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        const { remainingSeconds, originalDuration } = JSON.parse(savedData)

        if (originalDuration !== duration) {
          return duration
        }

        return remainingSeconds
      }
    } catch (error) {
      console.error('Error loading timer data:', error)
    }

    return duration
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          remainingSeconds: timeLeft,
          originalDuration: duration
        })
      )
    } catch (error) {
      console.error('Error saving timer data:', error)
    }
  }, [timeLeft, duration])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onAutoSubmit?.()
      return
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(prev - 1, 0)

        if (newTime <= 0) {
          clearInterval(timerRef.current)
          localStorage.removeItem(storageKey)
          onAutoSubmit?.()
        }

        return newTime
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [onAutoSubmit, timeLeft])

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      const { originalDuration } = JSON.parse(savedData)
      if (originalDuration !== duration) {
        setTimeLeft(duration)
      }
    }
  }, [duration])

  const percentage = ((timeLeft / duration) * 100).toFixed(2)

  return (
    <div className="fixed right-2 top-4 z-50 flex w-60 flex-col items-center space-y-2 rounded-lg border border-black bg-white px-2 py-2 shadow-md">
      <div className="text-3xl font-bold text-black">{formatTime(timeLeft)}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="mt-2 h-2 w-3/4 rounded-full bg-gray-300">
        <div
          className="h-2 rounded-full bg-blue-700 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default memo(TimeRemaining)
