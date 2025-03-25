// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import ReadingIntroduction from '@features/reading/ui/ReadingIntroduction.jsx'
import ReadingTestInstructions from '@features/reading/ui/ReadingInstruction.jsx'
import ReadingOrderingQuestion from '@features/reading/ui/ReadingOrderingQuestion.jsx'
import ReadingMatchingQuestion from '@features/reading/ui/ReadingMatchingQuestion'

const ReadingTestPage = () => {
  const [testData] = useState({
    testName: 'Aptis General Practice Test',
    section: 'Reading',
    questionCount: 5,
    timeAllowed: '35 mins',
    assessmentDescription: 'This assessment evaluates your ability to read and understand different types of texts.',
    formDescription: 'You will complete multiple-choice questions, sentence ordering, and gap-fill exercises.'
  })

  const [pageState, setPageState] = useState('intro')

  useEffect(() => {}, [])

  const handleStartTest = () => {
    setPageState('instructions')
  }

  const handleNext = () => {
    setPageState('test'), setPageState('orderingQuestion')
  }

  const renderContent = () => {
    switch (pageState) {
      case 'intro':
        return <ReadingIntroduction testData={testData && testData} onStartTest={handleStartTest} />
      case 'instructions':
        return <ReadingTestInstructions onStartTest={handleNext} />
      case 'test':
        return <ReadingMatchingQuestion />
      case 'orderingQuestion':
        return <ReadingOrderingQuestion />
      default:
        return <div>Loading...</div>
    }
  }

  return renderContent()
}

export default ReadingTestPage
