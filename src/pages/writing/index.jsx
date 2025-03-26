import { WritingProvider } from '@shared/context/writing-context'
import { Outlet } from 'react-router-dom'

export const WritingPage = () => {
  const data = {
    testName: 'Aptis General Practice Test',
    section: 'Writing',
    questionCount: 4,
    timeAllowed: '50 mins',
    assessmentDescription: 'This assessment evaluates your ability to write in English for different purposes.',
    formDescription: 'You will need to complete various writing tasks including emails, essays, and short responses.'
  }

  return (
    <>
      <WritingProvider data={data}>
        <Outlet />
      </WritingProvider>
    </>
  )
}
