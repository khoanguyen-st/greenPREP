import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import WritingIntroduction from '@features/writing/ui/Introduction.jsx';

const WritingTestPage = () => {
  // Mock data, no API to fetch yet
  const [testData, setTestData] = useState({
    testName: 'Aptis General Practice Test',
    section: 'Writing',
    questionCount: 4,
    timeAllowed: '50 mins',
    assessmentDescription: 'This assessment evaluates your ability to write in English for different purposes.',
    formDescription: 'You will need to complete various writing tasks including emails, essays, and short responses.',
  });
  
  const [pageState, setPageState] = useState('intro');

  // Placeholder for fetching from API on page load, maybe added later
  useEffect(() => {
    // Fetch data from API here
  }, []);

  const handleStartTest = () => {
    setPageState('instructions');
  };

  const renderContent = () => {
    switch (pageState) {
      case 'intro':
        return (
          <WritingIntroduction 
            testData={testData} 
            onStartTest={handleStartTest} 
          />
        );
        //Placeholder for test instruction page
      case 'instructions':
        return (
          //Instructions page component here
          <div></div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
      renderContent()
  );
};

export default WritingTestPage;