import { useEffect, useRef, useState } from 'react'

const AudioVisual = ({ enableAudioOutput = false }) => {
  const circleCanvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const [noMic, setNoMic] = useState(false)
  const [isActive] = useState(true)
  const [visualizationType] = useState('siri')

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
        analyserRef.current.fftSize = 4096
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
        draw()
      } catch (error) {
        console.error('Microphone access denied or unavailable.', error)
        setNoMic(true)
      }
    }

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) {
        return
      }
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current)

      let sum = 0
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        sum += Math.abs(dataArrayRef.current[i] - 128)
      }
      const average = sum / dataArrayRef.current.length
      const normalizedValue = Math.min(1, average / 50)
      drawSiriCircle(normalizedValue)

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    if (isActive) {
      startAudio()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enableAudioOutput, isActive, visualizationType])

  const drawSiriCircle = audioLevel => {
    if (!circleCanvasRef.current) {
      return
    }

    const canvas = circleCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    const centerX = canvas.offsetWidth / 2
    const centerY = canvas.offsetHeight / 2
    const baseRadius = Math.min(centerX, centerY) * 0.3
    const maxExpansion = Math.min(centerX, centerY) * 0.7
    const currentRadius = baseRadius + (maxExpansion - baseRadius) * audioLevel

    const primaryColor = { r: 0, g: 48, b: 135 }
    const r = Math.min(255, 48 + Math.floor(audioLevel * 200))
    const g = Math.min(255, 48 + Math.floor(audioLevel * 80))
    const b = Math.min(255, 135 + Math.floor(audioLevel * 120))
    const blendFactor = Math.min(1, audioLevel * 0.5)
    const blendedR = Math.floor(primaryColor.r * (1 - blendFactor) + r * blendFactor)
    const blendedG = Math.floor(primaryColor.g * (1 - blendFactor) + g * blendFactor)
    const blendedB = Math.floor(primaryColor.b * (1 - blendFactor) + b * blendFactor)
    const fillColor = `rgb(${blendedR}, ${blendedG}, ${blendedB})`
    ctx.beginPath()
    ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
    ctx.fillStyle = fillColor
    ctx.fill()

    const numRings = 6
    for (let i = 0; i < numRings; i++) {
      const ringRadius = currentRadius + (i + 1) * 10 * audioLevel
      const opacity = 0.7 - i * 0.15

      ctx.beginPath()
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
      ctx.lineWidth = 2
      ctx.stroke()
    }

    const numParticles = 20
    const particlePositions = []
    const outerRadius = currentRadius + 40 + 30 * audioLevel

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2

      const waveEffect = Math.sin(angle * 2 + Date.now() * 0.001) * 0.03 * audioLevel
      const distance = outerRadius + waveEffect

      const angleOffset = Math.PI / 2 + angle
      const x = centerX + Math.cos(angleOffset) * distance
      const y = centerY + Math.sin(angleOffset) * distance

      particlePositions.push({ x, y })
    }

    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = `rgba(${blendedR}, ${blendedG}, ${blendedB}, ${0.3 + audioLevel * 0.4})`

    for (let i = 0; i < particlePositions.length; i++) {
      const current = particlePositions[i]

      if (i === 0) {
        ctx.moveTo(current.x, current.y)
      } else {
        ctx.lineTo(current.x, current.y)
      }
    }
    ctx.closePath()
    ctx.stroke()
    ctx.setLineDash([])
    const numSmallParticles = 12
    for (let i = 0; i < numSmallParticles; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = currentRadius + Math.random() * 60 * audioLevel
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      const particleSize = Math.random() * 2 + 4 * audioLevel
      ctx.beginPath()
      ctx.arc(x, y, particleSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${blendedR}, ${blendedG}, ${blendedB}, 0.2 + ${audioLevel * 0.3})`
      ctx.fill()
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {noMic ? (
        <div>Your device does not have a microphone. Please connect a microphone to use this feature.</div>
      ) : (
        <canvas ref={circleCanvasRef} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  )
}

export default AudioVisual
