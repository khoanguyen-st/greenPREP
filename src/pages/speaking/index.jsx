import { SpeakingProvider } from '@shared/context/speaking-context'
import { Outlet } from 'react-router-dom'

export const SpeakingPage = () => {
  const data = {
    testName: 'Aptis General Practice Test',
    section: 'Speaking',
    questionCount: 4,
    timeAllowed: '12 mins',
    assessmentDescription: 'This is a practice test for Aptis General Speaking section.',
    formDescription: 'You will answer some questions about yourself and then do three shorts speaking tasks.'
  }

  return (
    <>
      <SpeakingProvider data={data}>
        <Outlet />
      </SpeakingProvider>
    </>
  )
}
