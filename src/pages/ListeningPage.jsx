import { useState } from 'react'
import { ConfigProvider } from 'antd'
import Introduction from '../features/Listening/ui/Introduction'
import Instruction from '../features/Listening/ui/Instruction'

const ListeningPage = () => {
  const [currentView, setCurrentView] = useState('introduction')

  const theme = {
    token: {
      colorPrimary: '#003087',
      borderRadius: 4,
      fontFamily: 'sans-serif'
    }
  }

  const handleStartTest = () => {
    setCurrentView('instruction')
    console.log('Moving to instructions...')
  }

  const handleNext = () => {
    setCurrentView('test')
    console.log('Starting the listening test...')
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-white">
        {currentView === 'introduction' && <Introduction onStart={handleStartTest} />}

        {currentView === 'instruction' && <Instruction onNext={handleNext} />}

        {currentView === 'test' && (
          <div className="p-12 text-center">
            <h2 className="text-2xl font-bold">Test Component Will Go Here</h2>
          </div>
        )}
      </div>
    </ConfigProvider>
  )
}

export default ListeningPage
