const TimerDisplay = ({ countdown, phase, content }) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'preparing':
        return {
          bg: 'bg-white',
          text: 'text-yellow-500',
          border: 'border-yellow-500',
          glow: 'shadow-[0_0_30px_rgba(234,179,8,0.1)]',
          progress: '#EAB308',
          progressBg: '#ddd'
        }
      case 'reading':
        return {
          bg: 'bg-white',
          text: 'text-[#003087]',
          border: 'border-[#003087]',
          glow: 'shadow-[0_0_30px_rgba(0,48,135,0.1)]',
          progress: '#003087',
          progressBg: '#ddd'
        }
      case 'answering':
        return {
          bg: 'bg-white',
          text: 'text-red-600',
          border: 'border-red-600',
          glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]',
          progress: '#DC2626',
          progressBg: '#ddd'
        }
      default:
        return {
          bg: 'bg-white',
          text: 'text-gray-600',
          border: 'border-gray-600',
          glow: 'shadow-[0_0_30px_rgba(107,114,128,0.1)]',
          progress: '#4B5563',
          progressBg: '#ddd'
        }
    }
  }

  const colors = getPhaseColor()

  const getMaxTime = () => {
    if (phase === 'preparing') {
      return content === 'PART 4' ? 60 : 0
    } else if (phase === 'reading') {
      return 5
    } else {
      if (content === 'PART 1') {
        return 30
      }
      if (content === 'PART 4') {
        return 120
      }
      return 45
    }
  }

  const maxTime = getMaxTime()
  const progress = (countdown / maxTime) * 100

  const getPhaseText = () => {
    switch (phase) {
      case 'preparing':
        return 'Preparing Time'
      case 'reading':
        return 'Reading Time'
      case 'answering':
        return 'Recording Time'
      default:
        return 'Time'
    }
  }

  return (
    <div className="relative z-0">
      <div
        className={`relative flex h-64 w-64 items-center justify-center rounded-full border-2 ${colors.border} ${colors.bg} ${colors.glow}`}
        style={{ zIndex: 1 }}
      >
        <style>
          {`
            @property --progress {
              syntax: "<number>";
              inherits: false;
              initial-value: 0;
            }

            .circular-progress {
              --size: 256px;
              --half-size: calc(var(--size) / 2);
              --stroke-width: 6px;
              --radius: calc((var(--size) - var(--stroke-width)) / 2);
              --circumference: calc(var(--radius) * 3.14159 * 2);
              --dash: calc((${progress} * var(--circumference)) / 100);
            }

            .circular-progress circle {
              cx: var(--half-size);
              cy: var(--half-size);
              r: var(--radius);
              stroke-width: var(--stroke-width);
              fill: none;
              stroke-linecap: round;
            }

            .circular-progress circle.bg {
              stroke: ${colors.progressBg};
            }

            .circular-progress circle.fg {
              transform: rotate(-90deg);
              transform-origin: var(--half-size) var(--half-size);
              stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
              transition: stroke-dasharray 0.3s linear;
              stroke: ${colors.progress};
            }
          `}
        </style>

        <div className="absolute inset-0">
          <svg className="circular-progress" viewBox="0 0 256 256">
            <circle className="bg" />
            <circle className="fg" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex items-baseline justify-center">
            <span className={`text-6xl font-bold ${colors.text}`}>{formatTime(countdown)}</span>
          </div>
          <p className={`mt-4 text-lg font-medium ${colors.text}`}>{getPhaseText()}</p>
        </div>
      </div>
    </div>
  )
}

export default TimerDisplay
