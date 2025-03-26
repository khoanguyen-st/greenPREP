import { useEffect, useState } from 'react'
const useCountdownTimer = (duration, onAutoSubmit) => {
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
    return () => clearInterval(timer)
  }, [timeLeft, onAutoSubmit])
  // Chuyển đổi giây thành HH:MM:SS ngay trong hook
  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return [hrs, mins, secs].map(unit => unit.toString().padStart(2, '0')).join(':')
  }
  return formatTime(timeLeft) // Trả về chuỗi thời gian đã định dạng
}
export default useCountdownTimer
