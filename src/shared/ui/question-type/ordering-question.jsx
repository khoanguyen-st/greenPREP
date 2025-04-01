import { useState, useRef, useMemo } from 'react'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      content: yup.string().required(),
      order: yup.number().required().min(1)
    })
  )
})

const OrderingQuestion = ({ options = [], className = '', userAnswer = [], setUserAnswer }) => {
  const initialItems = useMemo(() => {
    const orderMap = new Map(userAnswer.map(item => [item.key, item.value]))

    return options.map((option, index) => {
      const savedOrder = orderMap.get(option)
      return {
        id: String(index),
        content: option,
        order: savedOrder || null,
        placed: savedOrder !== undefined
      }
    })
  }, [options, userAnswer])

  const [items, setItems] = useState(initialItems)
  const [error, setError] = useState(null)

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleDragStart = (e, index) => {
    dragItem.current = index
    e.target.classList.add('dragging')
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnter = (e, slotIndex) => {
    e.preventDefault()
    dragOverItem.current = slotIndex
  }

  const handleBacklogDragEnter = e => {
    e.preventDefault()
    dragOverItem.current = 'backlog'
  }

  const handleDrop = async (e, slotIndex) => {
    e.preventDefault()

    const updatedItems = items.map((item, index) => {
      if (index === dragItem.current) {
        return { ...item, order: slotIndex + 1, placed: true }
      }

      if (item.order === slotIndex + 1) {
        return { ...item, order: null, placed: false }
      }
      return item
    })

    setItems(updatedItems)

    try {
      await validationSchema.validate({
        items: updatedItems.filter(item => item.placed)
      })
      setError(null)

      const formattedAnswer = updatedItems
        .filter(item => item.placed)
        .map(item => ({
          key: item.content,
          value: item.order
        }))

      setUserAnswer?.(formattedAnswer)
    } catch (validationError) {
      setError(validationError.message)
    }
  }

  const handleBacklogDrop = async e => {
    e.preventDefault()

    const updatedItems = items.map((item, index) => {
      if (index === dragItem.current) {
        return { ...item, order: null, placed: false }
      }
      return item
    })

    setItems(updatedItems)

    try {
      await validationSchema.validate({
        items: updatedItems.filter(item => item.placed)
      })
      setError(null)

      const formattedAnswer = updatedItems
        .filter(item => item.placed)
        .map(item => ({
          key: item.content,
          value: item.order
        }))

      setUserAnswer?.(formattedAnswer)
    } catch (validationError) {
      setError(validationError.message)
    }
  }

  const handleDragEnd = e => {
    e.target.classList.remove('dragging')
    dragItem.current = null
    dragOverItem.current = null
  }

  const slots = Array.from({ length: items.length }, (_, index) => index)

  return (
    <div className={`ordering-question mx-auto max-w-6xl ${className}`}>
      <div className="flex gap-8">
        <div className="w-3/5 space-y-4">
          {slots.map((slot, index) => {
            const placedItem = items.find(item => item.order === index + 1)

            return (
              <div
                key={`slot-${index}`}
                onDragOver={e => e.preventDefault()}
                onDragEnter={e => handleDragEnter(e, index)}
                onDrop={e => handleDrop(e, index)}
                className="flex h-24 items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-all duration-300 hover:border-[rgb(0,48,135)]"
              >
                <div className="mr-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(0,48,135)] text-xl font-bold text-white shadow-lg">
                  {index + 1}
                </div>
                {placedItem ? (
                  <div
                    draggable
                    onDragStart={e => handleDragStart(e, items.indexOf(placedItem))}
                    onDragEnd={handleDragEnd}
                    className="flex-grow cursor-grab text-lg font-medium text-slate-800 active:cursor-grabbing"
                  >
                    {placedItem.content}
                  </div>
                ) : (
                  <div className="flex-grow text-base text-slate-400">Drop item here</div>
                )}
              </div>
            )
          })}
        </div>

        <div
          className="w-2/5 rounded-xl border-2 border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg"
          onDragOver={e => e.preventDefault()}
          onDragEnter={handleBacklogDragEnter}
          onDrop={handleBacklogDrop}
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
              <span className="text-sm font-medium">Backlog</span>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
              {items.filter(item => !item.placed).length}
            </div>
          </div>
          <div className="space-y-3">
            {items
              .filter(item => !item.placed)
              .map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={e => handleDragStart(e, items.indexOf(item))}
                  onDragEnd={handleDragEnd}
                  className="group cursor-grab rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgb(0,48,135)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] active:cursor-grabbing"
                >
                  <div className="text-lg font-medium text-slate-800">{item.content}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default OrderingQuestion
