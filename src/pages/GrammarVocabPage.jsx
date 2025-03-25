import { useState } from 'react'
import { ConfigProvider } from 'antd'
import GrammarIntroduction from '../features/grammarvocab/ui/VocabIntroduction'
import VocabInstruction from '../features/grammarvocab/ui/VocabInstruction'
import useAntiCheat from '../shared/utils/antiCheat'
import CustomAlert from '../shared/ui/CustomAlert/CustomAlert'

const GrammarVocabPage = () => {
  const [step, setStep] = useState(1)
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat()

  const theme = {
    token: {
      colorPrimary: '#003087',
      borderRadius: 4,
      fontFamily: 'sans-serif'
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-white">
        {showAlert && <CustomAlert show={showAlert} onConfirm={enableFullScreen} message={alertMessage} />}

        {step === 1 && <GrammarIntroduction setStep={setStep} />}
        {step === 2 && <VocabInstruction setStep={setStep} />}
      </div>
    </ConfigProvider>
  )
}

export default GrammarVocabPage
