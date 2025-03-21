import React from "react";
import { Button, Typography} from "antd";

const { Title, Text } = Typography;

const WritingIntroduction = ({ testData, onStartTest }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-center">
      <div className="flex flex-col items-center justify-center flex-1 px-6 max-w-3xl mx-auto text-center">
        <Title className="text-3xl mb-8" style={{ color: '#003087' }}>GreenPREP</Title>
        <div className="w-full text-left mb-10">
          <Title level={4} className="m-0 leading-normal">{testData.testName}</Title>
          <Title level={5} className="m-0 leading-normal">{testData.section}</Title>
          
          <div className="mt-6">
            <div className="flex mb-4 md:flex-row flex-col">
              <div className="flex flex-col flex-1 md:mb-0 mb-4">
                <Text strong className="mb-1">Number of Questions</Text>
                <Text className="text-base">{testData.questionCount}</Text>
              </div>
              <div className="flex flex-col flex-1">
                <Text strong className="mb-1">Time Allowed</Text>
                <Text className="text-base">{testData.timeAllowed}</Text>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex flex-col w-full">
                <Text strong className="mb-1">Assessment Description</Text>
                <Text className="text-base">{testData.assessmentDescription}</Text>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex flex-col w-full">
                <Text strong className="mb-1">Form Description</Text>
                <Text className="text-base">{testData.formDescription}</Text>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="primary" 
          size="large" 
          className="w-[200px] h-10 text-base"
          style={{ backgroundColor: '#003087', borderColor: '#003087' }}
          onClick={onStartTest}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default WritingIntroduction;
