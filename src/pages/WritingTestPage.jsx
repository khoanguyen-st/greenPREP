import { useState, useEffect } from 'react'
import WritingIntroduction from '@features/writing/ui/Introduction.jsx'
import WritingInstructions from '@features/writing/ui/Instructions'
import WritingTestScreen from '@features/writing/ui/WritingTest'

const WritingTestPage = () => {
  const [testData] = useState({
    testName: 'Aptis General Practice Test',
    section: 'Writing',
    questionCount: 4,
    timeAllowed: '50 mins',
    assessmentDescription: 'This assessment evaluates your ability to write in English for different purposes.',
    formDescription: 'You will need to complete various writing tasks including emails, essays, and short responses.'
  })

  const [pageState, setPageState] = useState('intro')

  useEffect(() => {}, [])

  const handleStartTest = () => {
    setPageState('instructions')
  }

  const handleBeginTest = () => {
    setPageState('test')
  }

  const renderContent = () => {
    switch (pageState) {
      case 'intro':
        return <WritingIntroduction testData={testData} onStartTest={handleStartTest} />
      case 'instructions':
        return <WritingInstructions testData={testData} onStartTest={handleBeginTest} />
      case 'test':
          return <WritingTestScreen />;
      default:
        return <div>Loading...</div>
    }
  }

  return renderContent()
}

export default WritingTestPage
