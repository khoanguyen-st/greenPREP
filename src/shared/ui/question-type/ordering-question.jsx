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

const OrderingQuestion = ({ options = [], className = '', userAnswer = [], setUserAnswer, subcontent = '' }) => {
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
  const [selectedItem, setSelectedItem] = useState(null)

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

  const handleClick = async (item, slotIndex) => {
    const updatedItems = items.map(existingItem => {
      if (existingItem.id === item.id) {
        return { ...existingItem, order: slotIndex + 1, placed: true }
      }

      if (existingItem.order === slotIndex + 1) {
        return { ...existingItem, order: null, placed: false }
      }
      return existingItem
    })

    setItems(updatedItems)
    setSelectedItem(null)

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

  const slots = Array.from({ length: items.length }, (_, index) => index)

  return (
    <div className={`ordering-question mx-auto max-w-6xl ${className}`}>
      <div className="flex gap-8">
        <div className="w-1/2">
          {subcontent && (
            <div className="mb-6 select-none p-4">
              <div className="text-base text-slate-600">
                <span className="font-semibold text-slate-800">Example: </span>
                {subcontent.replace('Example:', '').trim()}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {slots.map((slot, index) => {
              const placedItem = items.find(item => item.order === index + 1)

              return (
                <div
                  key={`slot-${index}`}
                  onDragOver={e => e.preventDefault()}
                  onDragEnter={e => handleDragEnter(e, index)}
                  onDrop={e => handleDrop(e, index)}
                  className="flex h-20 items-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition-all duration-300 hover:border-[rgb(0,48,135)]"
                >
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 select-none items-center justify-center rounded-lg bg-[rgb(0,48,135)] text-base font-semibold text-white shadow-md">
                    {index + 1}
                  </div>
                  {placedItem ? (
                    <div
                      draggable
                      onDragStart={e => handleDragStart(e, items.indexOf(placedItem))}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab text-base font-medium text-slate-800 active:cursor-grabbing"
                    >
                      {placedItem.content}
                    </div>
                  ) : (
                    <div
                      className={`flex-grow select-none text-base ${
                        selectedItem ? 'cursor-pointer text-slate-600 hover:bg-slate-100' : 'text-slate-400'
                      } flex h-full items-center`}
                      onClick={() => {
                        if (selectedItem) {
                          handleClick(selectedItem, index)
                        }
                      }}
                    >
                      {selectedItem ? 'Click to place item here' : 'Drop item here'}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="flex w-1/2 items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)]"
          onDragOver={e => e.preventDefault()}
          onDragEnter={handleBacklogDragEnter}
          onDrop={handleBacklogDrop}
        >
          <div className="w-full space-y-3">
            {items.filter(item => !item.placed).length > 0 ? (
              items
                .filter(item => !item.placed)
                .map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={e => handleDragStart(e, items.indexOf(item))}
                    onDragEnd={handleDragEnd}
                    onClick={() => setSelectedItem(item)}
                    className={`group cursor-pointer rounded-lg border ${
                      selectedItem?.id === item.id ? 'border-[rgb(0,48,135)] bg-blue-50' : 'border-slate-200 bg-white'
                    } p-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.1),0_1px_8px_-1px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgb(0,48,135)] hover:shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1),0_4px_24px_-8px_rgba(0,0,0,0.08)] active:cursor-grabbing`}
                  >
                    <div className="text-base font-medium text-slate-800">{item.content}</div>
                  </div>
                ))
            ) : (
              <div className="flex h-24 select-none items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Empty</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
    </div>
  )
}

export default OrderingQuestion
