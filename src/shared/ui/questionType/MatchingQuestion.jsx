import { useEffect, useRef, useState } from 'react'

const MatchingQuestion = ({ leftItems, rightItems, matches, onChange, disabled = false, className = '' }) => {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [lines, setLines] = useState([])
  const containerRef = useRef(null)
  const leftItemsRefs = useRef({})
  const rightItemsRefs = useRef({})

  const drawLine = (start, end) => {
    if (!start || !end || !containerRef.current) return null
    const startRect = start.getBoundingClientRect()
    const endRect = end.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    const startX = startRect.right - containerRect.left
    const startY = startRect.top + startRect.height / 2 - containerRect.top
    const endX = endRect.left - containerRect.left
    const endY = endRect.top + endRect.height / 2 - containerRect.top
    const midX = (startX + endX) / 2
    return `M ${startX} ${startY}
            C ${midX} ${startY},
              ${midX} ${endY},
              ${endX} ${endY}`
  }

  useEffect(() => {
    const updateLines = () => {
      const newLines = []
      Object.entries(matches).forEach(([leftId, rightId]) => {
        const leftElement = leftItemsRefs.current[leftId]
        const rightElement = rightItemsRefs.current[rightId]
        const path = drawLine(leftElement, rightElement)
        if (path) {
          newLines.push({
            id: `${leftId}-${rightId}`,
            path,
            isMatched: true
          })
        }
      })
      if (selectedLeft && selectedRight) {
        const leftElement = leftItemsRefs.current[selectedLeft]
        const rightElement = rightItemsRefs.current[selectedRight]
        const path = drawLine(leftElement, rightElement)
        if (path) {
          newLines.push({
            id: `temp-${selectedLeft}-${selectedRight}`,
            path,
            isMatched: false
          })
        }
      }
      setLines(newLines)
    }
    requestAnimationFrame(updateLines)
    window.addEventListener('resize', updateLines)
    return () => window.removeEventListener('resize', updateLines)
  }, [matches, selectedLeft, selectedRight])

  const handleLeftSelect = value => {
    if (disabled) return
    if (value === selectedLeft) {
      setSelectedLeft(null)
    } else {
      setSelectedLeft(value)
      if (selectedRight) {
        const isRightIdMatched = Object.values(matches).includes(selectedRight)
        if (!isRightIdMatched) {
          onChange(value, selectedRight)
        }
        setSelectedLeft(null)
        setSelectedRight(null)
      }
    }
  }

  const handleRightSelect = value => {
    if (disabled) return
    if (value === selectedRight) {
      setSelectedRight(null)
    } else {
      const isRightIdMatched = Object.values(matches).includes(value)
      if (!isRightIdMatched) {
        setSelectedRight(value)
        if (selectedLeft) {
          onChange(selectedLeft, value)
          setSelectedLeft(null)
          setSelectedRight(null)
        }
      }
    }
  }

  return (
    <div
      className={`matching-question relative min-h-[400px] ${className}`}
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {lines.map(line => (
          <path
            key={line.id}
            d={line.path}
            stroke={line.isMatched ? '#3B82F6' : '#93C5FD'}
            strokeWidth="3"
            fill="none"
            style={{
              strokeDasharray: '1000',
              strokeDashoffset: '1000',
              animation: 'drawLine 0.5s ease-in-out forwards'
            }}
          />
        ))}
      </svg>

      <style>
        {`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>

      <div className="relative grid grid-cols-2 gap-8" style={{ zIndex: 2 }}>
        <div className="left-items space-y-4">
          <h3 className="mb-4 text-lg font-semibold">Column A</h3>
          {leftItems.map(item => (
            <div
              key={item.id}
              ref={el => (leftItemsRefs.current[item.id] = el)}
              className={`cursor-pointer rounded-lg border-[12px] p-4 shadow-md transition-all hover:shadow-xl ${
                selectedLeft === item.id
                  ? 'border-[14px] border-blue-900 bg-blue-50'
                  : matches[item.id]
                    ? 'border-[14px] border-blue-900 bg-blue-50'
                    : 'border-slate-950 hover:border-blue-800 hover:bg-blue-50'
              }`}
              onClick={() => handleLeftSelect(item.id)}
            >
              <div className="text-lg font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="right-items space-y-4">
          <h3 className="mb-4 text-lg font-semibold">Column B</h3>
          {rightItems.map(item => (
            <div
              key={item.id}
              ref={el => (rightItemsRefs.current[item.id] = el)}
              className={`cursor-pointer rounded-lg border-[12px] p-4 shadow-md transition-all hover:shadow-xl ${
                selectedRight === item.id
                  ? 'border-[14px] border-blue-900 bg-blue-50'
                  : Object.values(matches).includes(item.id)
                    ? 'border-[14px] border-blue-900 bg-blue-50'
                    : 'border-slate-950 hover:border-blue-800 hover:bg-blue-50'
              }`}
              onClick={() => handleRightSelect(item.id)}
            >
              <div className="text-lg font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MatchingQuestion
