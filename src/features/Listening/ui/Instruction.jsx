"use client"
import { Button, Typography } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography
const TEXT = {
  title: "Aptis General Listening Test Instructions",
  heading: "Listening",
  paragraphs: [
    "You will listen to seventeen recordings.",
    "Click on the PLAY button to listen to each recording.",
    "You can listen to each recording TWO TIMES ONLY",
    "You have 40 minutes to complete the test.",
  ],
  footer: "When you click on the 'Next' button, the test will begin.",
}

const Instruction = ({ onNext }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="w-full max-w-3xl">
          <div className="mb-6 sm:mb-8 px-2 sm:px-3">
            <Title 
              level={2} 
              className="font-bold text-5xl sm:text-4xl md:text-5xl md:whitespace-nowrap sm:leading-tight text-left text-[#003087]"
            >
              {TEXT.title}
            </Title>
          </div>

          <div className="mb-6 sm:mb-8 px-2 sm:px-3">
            <Title 
              level={4} 
              className="mb-3 sm:mb-4 font-bold text-xl sm:text-2xl"
            >
              {TEXT.heading}
            </Title>

            {TEXT.paragraphs.map((paragraph, index) => (
              <Paragraph 
                key={index} 
                className="mb-3 text-base sm:text-lg mx-1 sm:mx-0"
              >
                {index === 2 ? (
                  <>
                    You can listen to each recording{" "}
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

          <div className="mt-6 sm:mt-8 pt-3 mx-1 sm:mx-0 px-2 sm:px-3">
            <Paragraph className="text-gray-700 text-base sm:text-lg">
              {TEXT.footer}
            </Paragraph>
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