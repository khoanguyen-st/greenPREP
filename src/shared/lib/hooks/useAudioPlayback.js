import { useCallback, useEffect, useRef, useState } from 'react'

export const useAudioPlayback = audioBlob => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const audioPlayerRef = useRef(null)

  const playRecording = useCallback(() => {
    if (!audioBlob) {
      return
    }

    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      audioPlayerRef.current.currentTime = 0
      setIsPlaying(false)
      return
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }

    const newAudioUrl = URL.createObjectURL(audioBlob)
    setAudioUrl(newAudioUrl)

    const audio = new Audio(newAudioUrl)
    audioPlayerRef.current = audio
    setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.play()
  }, [audioBlob, audioUrl, isPlaying])

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (audioPlayerRef.current && isPlaying) {
        audioPlayerRef.current.pause()
      }
    }
  }, [audioUrl, isPlaying])

  return {
    isPlaying,
    playRecording,
    audioPlayerRef
  }
}
