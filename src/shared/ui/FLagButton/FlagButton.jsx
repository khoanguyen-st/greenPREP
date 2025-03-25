"use client"

import { FlagFilled, FlagOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"

export default function FlagButton({ onFlag, initialFlagged = false }) {
  const [isFlagged, setIsFlagged] = useState(initialFlagged)

  const handleClick = () => {
    const newFlaggedState = !isFlagged
    setIsFlagged(newFlaggedState)

    if (onFlag) {
      onFlag(newFlaggedState)
    }
  }

  return (
    <Button
      icon={isFlagged ? <FlagFilled className="text-red-600" /> : <FlagOutlined />}
      className={`mx-auto flex items-center justify-center gap-2 h-10 px-4 border rounded-md transition-colors ${
        isFlagged ? "bg-red-50 border-red-300 hover:border-red-400" : "border-gray-300 hover:border-gray-400"
      }`}
      onClick={handleClick}
    >
      <span className={`text-base font-normal ${isFlagged ? "text-red-600" : ""}`}>Flag</span>
    </Button>
  )
}
