import { memo, useEffect, useState } from 'react'

import formatTime from '../../utils/useCountdownTimer'

const TimeRemaining = ({ duration, label = 'Time remaining', onAutoSubmit }) => {
  const storageKey = 'timeRemainingData'

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      const { remainingTime, timestamp, originalDuration } = JSON.parse(savedData)

      const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000)
      const calculatedTimeLeft = Math.max(remainingTime - elapsedSeconds, 0)

      if (originalDuration !== duration || calculatedTimeLeft <= 0) {
        return duration
      }

      return calculatedTimeLeft
    }
    return duration
  })

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        remainingTime: timeLeft,
        timestamp: Date.now(),
        originalDuration: duration
      })
    )

    if (timeLeft <= 0) {
      onAutoSubmit?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newValue = Math.max(prev - 1, 0)
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            remainingTime: newValue,
            timestamp: Date.now(),
            originalDuration: duration
          })
        )
        return newValue
      })
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  useEffect(() => {
    if (duration) {
      localStorage.removeItem(storageKey)
      setTimeLeft(duration)
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
