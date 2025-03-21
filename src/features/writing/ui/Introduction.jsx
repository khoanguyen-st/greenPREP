import React from 'react';
import { Button, Typography, Avatar, Dropdown, Space } from 'antd';
import './Introduction.css';

const { Title, Text } = Typography;

const WritingIntroduction = ({ testData, onStartTest }) => {
  return (
    <div className="writing-intro-container">
      <div className="content-container">
        <Title className="brand-title">GreenPREP</Title>
        <div className="test-info">
          <Title level={3} className="test-name">{testData.testName}</Title>
          <Title level={5} className="section-name">{testData.section}</Title>

          <div className="test-details">
            <div className="detail-row">
              <div className="detail-column">
                <Title level={5} className="detail-label">Number of Questions</Title>
                <Text className="detail-value">{testData.questionCount}</Text>
              </div>
              <div className="detail-column">
                <Title level={5} className="detail-label">Time Allowed</Title>
                <Text className="detail-value">{testData.timeAllowed}</Text>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-column full-width">
                <Title level={5} className="detail-label">Assessment Description</Title>
                <Text className="detail-value">{testData.assessmentDescription}</Text>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-column full-width">
                <Title level={5} className="detail-label">Form Description</Title>
                <Text className="detail-value">{testData.formDescription}</Text>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="start-button"
          onClick={onStartTest}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default WritingIntroduction;