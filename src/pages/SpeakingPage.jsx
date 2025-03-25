import Instruction from '@features/speaking/ui/Instruction'
import Introduction from '@features/speaking/ui/Introduction'
//import MicrophoneTest from '@features/speaking/ui/MicrophoneTest'
import { useState } from 'react'
// import SpeakingTest from './SpeakingTest'

const SpeakingPage = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  if (step > 4) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-600">Error: Invalid navigation step.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      {step === 1 && <Introduction onNext={handleNext} />}

      {step === 2 && <Instruction onNext={handleNext} />}
      {/* {step === 3 && <MicrophoneTest onNext={handleNext} />}
      {step === 4 && <SpeakingTest />} */}
    </div>
  )
}

export default SpeakingPage
