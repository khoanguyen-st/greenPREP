import { useState, useEffect, memo } from 'react'

import formatTime from '../../utils/formatTime'

/**Cách dùng TimeRemaining trong mỗi Skills (speaking, listening, reading, writing, vocal/grammar)
 * B1: ⚠️Import TimeRemaining from "../shared/ui/TimeRemaining/TimeRemaining";⚠️
 * B2: ⚠️Phải có handleAutoSubmit để đếm ngược thời gian kết thúc thì auto submit⚠️
 * B3: Add dòng này ⚠️<TimeRemaining duration={số phút của skill * 60} onAutoSubmit={handAutoSubmit}/>⚠️
 */

const TimeRemaining = ({ duration, label = 'Time remaining', onAutoSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onAutoSubmit) {
        onAutoSubmit()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer)
  }, [timeLeft, onAutoSubmit])

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
