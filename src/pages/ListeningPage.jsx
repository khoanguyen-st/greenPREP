import { useState } from 'react'
import { ConfigProvider } from 'antd'
import Introduction from '../features/Listening/ui/Introduction'
import Instruction from '../features/Listening/ui/Instruction'
import useAntiCheat from '../shared/utils/antiCheat'
import CustomAlert from '../shared/ui/CustomAlert/CustomAlert'

const ListeningPage = () => {
  const [currentView, setCurrentView] = useState('introduction')
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat()

  const theme = {
    token: {
      colorPrimary: '#003087',
      borderRadius: 4,
      fontFamily: 'sans-serif'
    }
  }

  const handleStartTest = () => {
    setCurrentView('instruction')
  }

  const handleNext = async () => {
    await enableFullScreen()
    setCurrentView('test')
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-white">
        {showAlert && <CustomAlert show={showAlert} onConfirm={enableFullScreen} message={alertMessage} />}

        {currentView === 'introduction' && <Introduction onStart={handleStartTest} />}
        {currentView === 'instruction' && <Instruction onNext={handleNext} />}

        {currentView === 'test' && (
          <div className="p-12 text-center">
            <h2 className="text-2xl font-bold">Listening Test Started</h2>
          </div>
        )}
      </div>
    </ConfigProvider>
  )
}

export default ListeningPage
