import { useEffect, useRef, useState } from 'react'

const AudioVisual = ({ waveColor = '#6A9C89', enableAudioOutput = false }) => {
  const canvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const [noAudio, setNoAudio] = useState(false)

  useEffect(() => {
    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        })

        mediaStreamRef.current = stream
        audioContextRef.current = new AudioContext()
        const source = audioContextRef.current.createMediaStreamSource(stream)
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        const bufferLength = analyserRef.current.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)

        const highPassFilter = audioContextRef.current.createBiquadFilter()
        highPassFilter.type = 'highpass'
        highPassFilter.frequency.value = 300

        const lowPassFilter = audioContextRef.current.createBiquadFilter()
        lowPassFilter.type = 'lowpass'
        lowPassFilter.frequency.value = 3000

        source.connect(highPassFilter)
        highPassFilter.connect(lowPassFilter)
        lowPassFilter.connect(analyserRef.current)

        if (enableAudioOutput) {
          analyserRef.current.connect(audioContextRef.current.destination)
        }

        const drawWaveform = () => {
          if (!canvasRef.current) {
            return
          }
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          analyserRef.current.getByteFrequencyData(dataArrayRef.current)

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#F0F0F0'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          let hasAudio = false
          const barWidth = (canvas.width / bufferLength) * 2.5
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArrayRef.current[i] / 1.5
            if (barHeight > 10) {
              hasAudio = true
            }
            ctx.fillStyle = waveColor
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 1
          }

          setNoAudio(!hasAudio)
          animationFrameRef.current = requestAnimationFrame(drawWaveform)
        }

        drawWaveform()
      } catch (error) {
        console.error('Microphone access denied or unavailable.', error)
        setNoAudio(true)
      }
    }

    startAudio()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
      audioContextRef.current?.close()
    }
  }, [enableAudioOutput, waveColor])

  return (
    <div className="mx-auto w-4/5 max-w-md rounded-lg p-3">
      <canvas ref={canvasRef} className="h-24 w-2/3 rounded-xl" />
      {noAudio && <p className="mt-2 text-sm text-red-600">No record detected!</p>}
    </div>
  )
}

export default AudioVisual
