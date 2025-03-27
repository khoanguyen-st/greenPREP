import { SpeakingProvider } from '@shared/context/speaking-context'
import { Outlet } from 'react-router-dom'

import { SPEAKING_DATA } from '@/__mock/speaking'

const SpeakingPage = () => {
  return (
    <>
      <SpeakingProvider data={SPEAKING_DATA}>
        <Outlet />
      </SpeakingProvider>
    </>
  )
}

export default SpeakingPage
