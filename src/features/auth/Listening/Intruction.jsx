"use client";
import { Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Intruction = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-3xl mx-auto flex-grow px-4">
        <div className="text-center mb-8">
          <Title level={2} className="font-bold text-[#003087]">
            Aptis General Listening Test Instructions
          </Title>
        </div>

        <div className="mb-10">
          <Title level={4} className="font-bold mb-4">
            Listening
          </Title>
          <Paragraph className="text-base mb-3">
            You will listen to seventeen recordings.
          </Paragraph>
          <Paragraph className="text-base mb-3">
            Click on the PLAY button to listen to each recording.
          </Paragraph>
          <Paragraph className="text-base mb-3">
            You can listen to each recording <Text strong>TWO TIMES ONLY</Text>
          </Paragraph>
          <Paragraph className="text-base mb-3">
            You have 40 minutes to complete the test.
          </Paragraph>
        </div>

        <div className="mt-12 pt-4">
          <Paragraph className="text-gray-700">
            When you click on the &apos;Next&apos; button, the test will begin.
          </Paragraph>
        </div>
      </div>
      <div className="border-t border-gray-400 mt-auto mb-auto pt-4 pb-4 flex justify-end px-4" style={{ borderStyle: "solid" }}>
        <Button
          onClick={onNext}
          type="primary"
          size="large"
          className="bg-[#003087] hover:bg-[#003087]/90 mx-4"
          style={{
            backgroundColor: "#003087",
            borderColor: "#003087",
          }}
        >
          Next <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Intruction;