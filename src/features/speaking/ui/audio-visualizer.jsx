import { useEffect, useRef } from 'react'

const AudioVisualizer = ({ isRecording, stream, diameter = 300, phase }) => {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)

  const getVisualizerColors = () => {
    return {
      gradientColors: [
        { offset: 0, color: 'rgba(254, 202, 202, 0.9)' },
        { offset: 0.3, color: 'rgba(252, 165, 165, 0.9)' },
        { offset: 0.6, color: 'rgba(220, 38, 38, 0.9)' },
        { offset: 1, color: 'rgba(185, 28, 28, 0.9)' }
      ],
      glow: 'rgba(220, 38, 38, 0.8)'
    }
  }

  useEffect(() => {
    if (isRecording && stream && phase === 'answering') {
      const audioContext = new (window.AudioContext || AudioContext)()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)

      analyser.fftSize = 512
      source.connect(analyser)

      audioContextRef.current = audioContext
      analyserRef.current = analyser
      sourceRef.current = source

      drawVisualizer()
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect()
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }

      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect()
      }

      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [isRecording, stream, phase])

  const drawVisualizer = () => {
    if (!isRecording || !analyserRef.current || !canvasRef.current || phase !== 'answering') {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const analyser = analyserRef.current
    const colors = getVisualizerColors()

    canvas.width = diameter + 100
    canvas.height = diameter + 100

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const center = canvas.width / 2
      const timerRadius = diameter / 2
      const waveRadius = timerRadius - 5

      drawWaveCircle(ctx, dataArray, center, center, waveRadius, 0, colors, 0.9)
      drawWaveCircle(ctx, dataArray, center, center, waveRadius + 2, 5, colors, 0.6)
      drawWaveCircle(ctx, dataArray, center, center, waveRadius + 4, 10, colors, 0.3)
    }

    draw()
  }

  const drawWaveCircle = (ctx, dataArray, centerX, centerY, radius, dataOffset, colors, alpha) => {
    const segments = 180
    const step = (Math.PI * 2) / segments

    ctx.beginPath()

    let firstX, firstY
    let previousAmplitude = 0

    let total = 0
    for (let i = 0; i < dataArray.length; i++) {
      total += dataArray[i]
    }
    const average = total / dataArray.length

    for (let i = 0; i < segments; i++) {
      const dataIndex = (i + dataOffset) % (dataArray.length / 2)

      const baseValue = average / 255.0
      const pointValue = dataArray[dataIndex] / 255.0

      const combinedValue = baseValue * 0.5 + pointValue * 0.5

      const amplitude = Math.min(combinedValue * 40, 40)

      const smoothedAmplitude = (amplitude + previousAmplitude) / 2
      previousAmplitude = amplitude

      const currentRadius = radius + smoothedAmplitude

      const angle = i * step
      const x = centerX + Math.cos(angle) * currentRadius
      const y = centerY + Math.sin(angle) * currentRadius

      if (i === 0) {
        ctx.moveTo(x, y)
        firstX = x
        firstY = y
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.lineTo(firstX, firstY)

    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.3)

    colors.gradientColors.forEach(stop => {
      gradient.addColorStop(stop.offset, stop.color)
    })

    ctx.globalCompositeOperation = 'lighter'

    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.globalAlpha = alpha

    ctx.shadowColor = colors.glow
    ctx.shadowBlur = 10
    ctx.stroke()

    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1.0
  }

  if (phase !== 'answering') {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute"
        width={diameter + 100}
        height={diameter + 100}
        style={{
          zIndex: 10
        }}
      />
    </div>
  )
}

export default AudioVisualizer
