import { useEffect, useRef, useState } from 'react'

const AudioVisual = ({ enableAudioOutput = false }) => {
  const canvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const [noMic, setNoMic] = useState(false)

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
        analyserRef.current.fftSize = 2048
        analyserRef.current.smoothingTimeConstant = 1

        const bufferLength = analyserRef.current.fftSize
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

        setNoMic(false)

        const drawWaveform = () => {
          if (!canvasRef.current) {
            return
          }

          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')
          analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          const sliceWidth = (canvas.width * 1.5) / bufferLength
          let x = 0

          const waveLayers = [{ lineWidth: 1, strokeStyle: '#003087', offset: 0 }]

          waveLayers.forEach(({ lineWidth, strokeStyle, offset }) => {
            x = 0
            ctx.beginPath()
            ctx.lineWidth = lineWidth
            ctx.strokeStyle = strokeStyle

            for (let i = 0; i < bufferLength; i++) {
              const v = dataArrayRef.current[i] / 128.0
              const y = (v - 1.0) * (canvas.height / 1.5) + canvas.height / 2 + offset

              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                const prevX = x - sliceWidth
                const prevY =
                  (dataArrayRef.current[i - 1] / 128.0 - 1.0) * (canvas.height / 1.5) + canvas.height / 2 + offset
                const interpolatedY = (prevY + y) / 2
                ctx.quadraticCurveTo(prevX, prevY, x, interpolatedY)
              }

              x += sliceWidth
            }

            ctx.stroke()
          })

          animationFrameRef.current = requestAnimationFrame(drawWaveform)
        }

        drawWaveform()
      } catch (error) {
        console.error('Microphone access denied or unavailable.', error)
        setNoMic(true)
      }
    }

    startAudio()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
      audioContextRef.current?.close()
    }
  }, [enableAudioOutput])

  return (
    <div className="w-[800px] rounded-xl border-[6px] border-[#00b894] p-3">
      <p className="mb-3 text-sm text-gray-600">{noMic ? 'Microphone not detected or permission denied!' : ''}</p>
      <canvas ref={canvasRef} className="h-24 w-full rounded-xl" />
    </div>
  )
}

export default AudioVisual
