import { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'

const itemSchema = yup.object().shape({
  id: yup.string().required('Item must have an ID'),
  label: yup.string().required('Item must have a label')
})

const matchingQuestionSchema = yup.object().shape({
  leftItems: yup.array().of(itemSchema).min(1, 'Left items cannot be empty').required('Left items are required'),
  rightItems: yup.array().of(itemSchema).min(1, 'Right items cannot be empty').required('Right items are required'),
  userAnswer: yup.array().of(
    yup.object().shape({
      left: yup.string().required(),
      right: yup.string().required()
    })
  ),
  disabled: yup.boolean(),
  className: yup.string()
})

const MatchingQuestion = ({
  leftItems,
  rightItems,
  userAnswer = [],
  setUserAnswer,
  disabled = false,
  className = ''
}) => {
  useEffect(() => {
    const validateData = async () => {
      try {
        await matchingQuestionSchema.validate({
          leftItems,
          rightItems,
          userAnswer,
          disabled
        })
      } catch (error) {
        console.error('Validation error:', error.message)
      }
    }

    validateData()
  }, [leftItems, rightItems, userAnswer, disabled])

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [lines, setLines] = useState([])
  const [matches, setMatches] = useState({})
  const containerRef = useRef(null)
  const leftItemsRefs = useRef({})
  const rightItemsRefs = useRef({})

  useEffect(() => {
    const newMatches = {}
    userAnswer.forEach(answer => {
      const leftId = leftItems.findIndex(item => item.label === answer.left) + 1
      const rightId = String.fromCharCode(97 + rightItems.findIndex(item => item.label === answer.right))
      if (leftId > 0) {
        newMatches[leftId] = rightId
      }
    })
    setMatches(newMatches)
  }, [userAnswer, leftItems, rightItems])

  const updateUserAnswer = newMatches => {
    const formattedAnswers = Object.entries(newMatches).map(([leftId, rightId]) => {
      const leftText = leftItems[parseInt(leftId) - 1].label
      const rightText = rightItems[rightId.charCodeAt(0) - 97].label
      return {
        left: leftText,
        right: rightText
      }
    })
    setUserAnswer(formattedAnswers)
  }

  const handleLeftSelect = value => {
    if (disabled) return

    if (matches[value]) {
      const newMatches = { ...matches }
      delete newMatches[value]
      setMatches(newMatches)
      updateUserAnswer(newMatches)
      setSelectedLeft(null)
      setSelectedRight(null)
      return
    }

    if (value === selectedLeft) {
      setSelectedLeft(null)
    } else {
      setSelectedLeft(value)
      if (selectedRight) {
        const isRightIdMatched = Object.values(matches).includes(selectedRight)
        if (!isRightIdMatched) {
          const newMatches = { ...matches, [value]: selectedRight }
          setMatches(newMatches)
          updateUserAnswer(newMatches)
        }
        setSelectedLeft(null)
        setSelectedRight(null)
      }
    }
  }

  const handleRightSelect = value => {
    if (disabled) return

    const matchedLeftId = Object.entries(matches).find(([rightId]) => rightId === value)?.[0]
    if (matchedLeftId) {
      const newMatches = { ...matches }
      delete newMatches[matchedLeftId]
      setMatches(newMatches)
      updateUserAnswer(newMatches)
      setSelectedLeft(null)
      setSelectedRight(null)
      return
    }

    if (value === selectedRight) {
      setSelectedRight(null)
    } else {
      const isRightIdMatched = Object.values(matches).includes(value)
      if (!isRightIdMatched) {
        setSelectedRight(value)
        if (selectedLeft) {
          const newMatches = { ...matches, [selectedLeft]: value }
          setMatches(newMatches)
          updateUserAnswer(newMatches)
          setSelectedLeft(null)
          setSelectedRight(null)
        }
      }
    }
  }

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
            stroke={line.isMatched ? '#1E40AF' : '#60A5FA'}
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

      <div className="relative grid grid-cols-2 gap-8 md:gap-16" style={{ zIndex: 2 }}>
        <div className="left-items space-y-4">
          <h3 className="mb-4 text-lg font-semibold">Column A</h3>
          {leftItems.map(item => (
            <div
              key={item.id}
              ref={el => (leftItemsRefs.current[item.id] = el)}
              className={`cursor-pointer rounded-lg border-[12px] p-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] ${
                selectedLeft === item.id
                  ? 'border-slate-950 bg-blue-50'
                  : matches[item.id]
                    ? 'border-[14px] border-[#1E40AF] bg-blue-50 hover:bg-blue-100'
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
              className={`cursor-pointer rounded-lg border-[12px] p-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] ${
                selectedRight === item.id
                  ? 'border-slate-950 bg-blue-50'
                  : Object.values(matches).includes(item.id)
                    ? 'border-[14px] border-[#1E40AF] bg-blue-50 hover:bg-blue-100'
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
