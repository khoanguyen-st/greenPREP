const TimerDisplay = ({ countdown, phase }) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'reading':
        return {
          bg: 'bg-white',
          text: 'text-[#003087]',
          border: 'border-[#003087]',
          glow: 'shadow-[0_0_30px_rgba(0,48,135,0.1)]',
          progress: 'stroke-[#003087]',
          progressBg: 'stroke-gray-100',
          label: 'text-[#003087]'
        }
      case 'answering':
        return {
          bg: 'bg-white',
          text: 'text-red-600',
          border: 'border-red-600',
          glow: 'shadow-[0_0_30px_rgba(220,38,38,0.1)]',
          progress: 'stroke-red-600',
          progressBg: 'stroke-gray-100',
          label: 'text-red-600'
        }
      default:
        return {
          bg: 'bg-white',
          text: 'text-gray-600',
          border: 'border-gray-600',
          glow: 'shadow-[0_0_30px_rgba(107,114,128,0.1)]',
          progress: 'stroke-gray-600',
          progressBg: 'stroke-gray-100',
          label: 'text-gray-600'
        }
    }
  }

  const colors = getPhaseColor()

  return (
    <div className="relative">
      <div
        className={`relative flex h-64 w-64 items-center justify-center rounded-full border-2 ${colors.border} ${colors.bg} ${colors.glow} transition-all duration-500`}
      >
        <div className="absolute inset-0 rounded-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzAwMzA4NyIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10" />

        <div className="relative text-center">
          <div className="flex items-baseline justify-center">
            <span className={`text-6xl font-bold ${colors.text}`}>{formatTime(countdown)}</span>
          </div>
          <p className={`mt-4 text-lg font-medium ${colors.label}`}>
            {phase === 'reading' ? 'Reading Time' : 'Recording Time'}
          </p>
        </div>

        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle className={`fill-none ${colors.progressBg}`} strokeWidth="3" cx="50%" cy="50%" r="48%" />
          <circle
            className={`fill-none ${colors.progress} transition-all duration-1000 ease-in-out`}
            strokeWidth="3"
            strokeDasharray={`${(countdown / (phase === 'reading' ? 5 : 60)) * 100} 100`}
            strokeLinecap="round"
            cx="50%"
            cy="50%"
            r="48%"
          />
        </svg>

        <div className="absolute inset-0 rounded-full border-2 border-[#003087]/10" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#003087]/5 to-transparent" />
      </div>
    </div>
  )
}

export default TimerDisplay
