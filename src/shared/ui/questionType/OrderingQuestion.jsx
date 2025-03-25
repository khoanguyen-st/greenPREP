import { useState, useRef, useMemo } from 'react'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        content: yup.string().required(),
        order: yup.number().required().min(1)
      })
    )
    .min(2, 'At least 2 items are required')
})

const OrderingQuestion = ({ options = [], onChange, className = '', value = [] }) => {
  const initialItems = useMemo(() => {
    return value.length > 0
      ? value
      : options.map((option, index) => ({
          id: String(index),
          content: option,
          order: index + 1
        }))
  }, [options, value])

  const [items, setItems] = useState(initialItems)
  const [error, setError] = useState(null)

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleDragStart = (e, index) => {
    dragItem.current = index
    e.target.classList.add('dragging')
    e.dataTransfer.effectAllowed = 'move'

    const dragPreview = e.target.cloneNode(true)
    dragPreview.style.opacity = '0.5'
    dragPreview.style.position = 'absolute'
    dragPreview.style.top = '-1000px'
    document.body.appendChild(dragPreview)
    e.dataTransfer.setDragImage(dragPreview, 0, 0)
    setTimeout(() => document.body.removeChild(dragPreview), 0)
  }

  const handleDragEnter = (e, index) => {
    e.preventDefault()
    if (dragItem.current === index) {
      return
    }

    dragOverItem.current = index
    const listItems = [...items]
    const draggedItemContent = listItems[dragItem.current]

    listItems.splice(dragItem.current, 1)
    listItems.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = dragOverItem.current

    const updatedItems = listItems.map((item, idx) => ({
      ...item,
      order: idx + 1
    }))

    setItems(updatedItems)
  }

  const handleDragEnd = async e => {
    e.target.classList.remove('dragging')
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))
    setItems(updatedItems)

    try {
      await validationSchema.validate({ items: updatedItems })
      setError(null)
      onChange?.(updatedItems)
    } catch (validationError) {
      setError(validationError.message)
    }

    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <div className={`ordering-question mx-auto max-w-3xl ${className}`}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={e => handleDragStart(e, index)}
            onDragEnter={e => handleDragEnter(e, index)}
            onDragOver={e => e.preventDefault()}
            onDragEnd={handleDragEnd}
            className="group relative cursor-grab select-none rounded-xl border-2 border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgb(0,48,135)] hover:bg-gradient-to-r hover:from-slate-50 hover:to-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] active:cursor-grabbing [&.dragging]:scale-[1.02] [&.dragging]:border-[rgb(0,48,135)] [&.dragging]:bg-white [&.dragging]:shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
          >
            <div className="flex items-center gap-5">
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[rgb(0,48,135)] text-lg font-bold text-white shadow-[0_2px_8px_rgba(0,48,135,0.25)] transition-all duration-300 ease-out after:absolute after:inset-0 after:bg-white/20 after:opacity-0 after:transition-opacity after:duration-300 group-hover:shadow-[0_4px_12px_rgba(0,48,135,0.35)] group-hover:after:opacity-100">
                {item.order}
              </div>
              <div className="flex-grow text-lg font-medium text-slate-800 transition-transform duration-300 group-hover:translate-x-1">
                {item.content}
              </div>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-[rgb(0,48,135)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h13M8 12h13M8 20h13M4 4h1M4 12h1M4 20h1" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default OrderingQuestion
