import { Button, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
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
      <div className="flex flex-grow items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        <div className="w-full max-w-3xl">
          <div className="mb-6 px-2 sm:mb-8 sm:px-3">
            <Title
              level={2}
              className="text-left text-5xl font-bold sm:text-4xl sm:leading-tight md:whitespace-nowrap md:text-5xl"
            >
              {TEXT.title}
            </Title>
          </div>

          <div className="mb-6 px-2 sm:mb-8 sm:px-3">
            <Title level={4} className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
              {TEXT.heading}
            </Title>

            {TEXT.paragraphs.map((paragraph, index) => (
              <Paragraph key={index} className="mx-1 mb-3 text-base sm:mx-0 sm:text-lg">
                {index === 2 ? (
                  <>
                    You can listen to each recording{' '}
                    <Text strong className="text-lg sm:text-xl">
                      TWO TIMES ONLY
                    </Text>
                  </>
                ) : (
                  paragraph
                )}
              </Paragraph>
            ))}
          </div>

          <div className="mx-1 mt-6 px-2 pt-3 sm:mx-0 sm:mt-8 sm:px-3">
            <Paragraph className="text-base text-gray-700 sm:text-lg">{TEXT.footer}</Paragraph>
          </div>
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
