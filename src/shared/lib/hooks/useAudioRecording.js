import message from 'antd/es/message'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [countdown, setCountdown] = useState(5)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const countdownTimerRef = useRef(null)
  const streamRef = useRef(null)
  const audioContextRef = useRef(null)

  const handleError = useCallback(error => {
    message.error(error?.message || 'An error occurred with the microphone')
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        mediaRecorderRef.current = new MediaRecorder(stream)
        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data)
        }
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          setAudioBlob(audioBlob)
          audioChunksRef.current = []
        }
        mediaRecorderRef.current.start()
        setIsRecording(true)
        setCountdown(5)

        const startTime = Date.now()
        const totalDuration = 5000

        countdownTimerRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime
          const remaining = Math.ceil((totalDuration - elapsed) / 1000)

          if (remaining <= 0) {
            clearInterval(countdownTimerRef.current)
            stopRecording()
            setCountdown(0)
          } else {
            setCountdown(remaining)
          }
        }, 100)

        // Create audio context for visualization
        audioContextRef.current = new AudioContext()
        const analyser = audioContextRef.current.createAnalyser()
        const source = audioContextRef.current.createMediaStreamSource(stream)
        source.connect(analyser)
        analyser.fftSize = 32
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const updateAudioLevel = () => {
          if (!analyser) {
            return
          }
          analyser.getByteFrequencyData(dataArray)
          if (mediaRecorderRef.current?.state === 'recording') {
            requestAnimationFrame(updateAudioLevel)
          }
        }
        updateAudioLevel()
      })
      .catch(handleError)
  }, [handleError, stopRecording])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current)
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
      }
    }
  }, [])

  return {
    isRecording,
    audioBlob,
    countdown,
    startRecording,
    stopRecording,
    setAudioBlob
  }
}
