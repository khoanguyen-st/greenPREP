import { Button, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
const { Title } = Typography

const WritingInstructions = ({ testData, onStartTest }) => {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <div className="mx-auto max-w-3xl flex-1 px-6 py-10 text-left">
        <Title level={2} className="mb-4 text-2xl">
          {testData.testName} Instructions
        </Title>

        <Title level={4} className="mb-6 text-xl">
          {testData.section}
        </Title>

        <Typography className="mb-4 text-base">
          The test has four parts and takes up to {testData.timeAllowed}.
        </Typography>

        <Typography className="mb-4 text-base">Recommended times:</Typography>

        <Typography className="mb-2 text-base">Part One: 3 minutes</Typography>

        <Typography className="mb-2 text-base">Part Two: 7 minutes</Typography>

        <Typography className="mb-2 text-base">Part Three: 10 minutes</Typography>

        <Typography className="mb-2 text-base">Part Four: 30 minutes</Typography>

        <Typography className="mt-8 text-base">
          When you click on the &#39;Next&#39; button, the test will begin.
        </Typography>
      </div>

      <div className="flex justify-end border-t border-gray-200 p-4">
        <Button
          type="primary"
          className="flex h-[60px] min-w-[110px] items-center rounded border-[#003087] bg-[#003087] px-5"
          onClick={onStartTest}
        >
          <span>Next</span> <ArrowRightOutlined className="ml-3 text-lg" />
        </Button>
      </div>
    </div>
  )
}

export default WritingInstructions
