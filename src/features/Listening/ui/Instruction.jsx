'use client'

import { Button, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

// Constants
const COLORS = {
  primary: '#003087'
}

const TEXT = {
  title: 'Aptis General Listening Test Instructions',
  heading: 'Listening',
  paragraphs: [
    'You will listen to seventeen recordings.',
    'Click on the PLAY button to listen to each recording.',
    'You can listen to each recording TWO TIMES ONLY',
    'You have 40 minutes to complete the test.'
  ],
  footer: "When you click on the 'Next' button, the test will begin."
}

const Instruction = ({ onNext }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-3xl flex-grow px-4">
        <div className="mb-8 text-center">
          <Title level={2} style={{ color: COLORS.primary, fontWeight: 'bold' }} className="font-bold">
            {TEXT.title}
          </Title>
        </div>

        <div className="mb-10">
          <Title level={4} className="mb-4 font-bold">
            {TEXT.heading}
          </Title>

          {TEXT.paragraphs.map((paragraph, index) => (
            <Paragraph key={index} className="mb-3 text-base">
              {index === 2 ? (
                <>
                  You can listen to each recording <Text strong>TWO TIMES ONLY</Text>
                </>
              ) : (
                paragraph
              )}
            </Paragraph>
          ))}
        </div>

        <div className="mt-12 pt-4">
          <Paragraph className="text-gray-700">{TEXT.footer}</Paragraph>
        </div>
      </div>

      <div className="mb-auto mt-auto flex justify-end border-t border-solid border-gray-400 px-4 pb-4 pt-4">
        <Button
          onClick={onNext}
          type="primary"
          size="large"
          className="mx-4 border-2 border-[#003087] bg-[#003087] text-white hover:border-[#FF6E00]/90 hover:bg-[#003087]/90 focus:ring-2 focus:ring-[#003087]/50"
        >
          Next <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  )
}

export default Instruction
