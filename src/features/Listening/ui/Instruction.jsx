'use client'
import { Button, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const Intruction = ({ onNext }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-3xl flex-grow px-4">
        <div className="mb-8 text-center">
          <Title level={2} className="font-bold text-[#003087]">
            Aptis General Listening Test Instructions
          </Title>
        </div>

        <div className="mb-10">
          <Title level={4} className="mb-4 font-bold">
            Listening
          </Title>
          <Paragraph className="mb-3 text-base">You will listen to seventeen recordings.</Paragraph>
          <Paragraph className="mb-3 text-base">Click on the PLAY button to listen to each recording.</Paragraph>
          <Paragraph className="mb-3 text-base">
            You can listen to each recording <Text strong>TWO TIMES ONLY</Text>
          </Paragraph>
          <Paragraph className="mb-3 text-base">You have 40 minutes to complete the test.</Paragraph>
        </div>

        <div className="mt-12 pt-4">
          <Paragraph className="text-gray-700">
            When you click on the &apos;Next&apos; button, the test will begin.
          </Paragraph>
        </div>
      </div>
      <div
        className="mb-auto mt-auto flex justify-end border-t border-gray-400 px-4 pb-4 pt-4"
        style={{ borderStyle: 'solid' }}
      >
        <Button
          onClick={onNext}
          type="primary"
          size="large"
          className="mx-4 bg-[#003087] hover:bg-[#003087]/90"
          style={{
            backgroundColor: '#003087',
            borderColor: '#003087'
          }}
        >
          Next <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  )
}

export default Intruction
