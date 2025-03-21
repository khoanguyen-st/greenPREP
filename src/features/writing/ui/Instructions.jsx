import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const WritingInstructions = ({ testData, onStartTest }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-10 text-left">
        <Title level={2} className="text-2xl mb-4">
          {testData.testName} Instructions
        </Title>
        
        <Title level={4} className="text-xl mb-6">
          {testData.section}
        </Title>
        
        <Paragraph className="text-base mb-4">
          The test has four parts and takes up to {testData.timeAllowed}.
        </Paragraph>
        
        <Paragraph className="text-base mb-4">
          Recommended times:
        </Paragraph>
        
        <Paragraph className="text-base mb-2 ml-4">
          Part One: 3 minutes
        </Paragraph>
        
        <Paragraph className="text-base mb-2 ml-4">
          Part Two: 7 minutes
        </Paragraph>
        
        <Paragraph className="text-base mb-2 ml-4">
          Part Three: 10 minutes
        </Paragraph>
        
        <Paragraph className="text-base mb-2 ml-4">
          Part Four: 30 minutes
        </Paragraph>
        
        <Paragraph className="text-base mt-8 mb-4">
          When you click on the 'Next' button, the test will begin.
        </Paragraph>
      </div>
      
      <div className="border-t border-gray-200 p-4 flex justify-end">
        <Button 
          type="primary"
          className="flex items-center h-[60px] min-w-[110px] px-5 rounded"
          style={{ 
            backgroundColor: '#003087', 
            borderColor: '#003087',
            boxShadow: 'none'
          }}
          onClick={onStartTest}
        >
          <span>Next</span> <ArrowRightOutlined className="ml-3 text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default WritingInstructions;