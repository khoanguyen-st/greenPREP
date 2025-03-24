import { FlagOutlined } from "@ant-design/icons"
import { Button } from "antd"

export default function FlagButton() {
  return (
    <Button
      icon={<FlagOutlined />}
      className="flex items-center justify-center gap-2 h-10 px-4 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
    >
      <span className="text-base font-normal">Flag</span>
    </Button>
  )
}
