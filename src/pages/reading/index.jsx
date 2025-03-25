import { ReadingProvider } from '@shared/context/reading-context'
import { Outlet } from 'react-router-dom'

export const ReadingPage = () => {
  const data = {
    testName: 'Aptis General Practice Test',
    section: 'Reading',
    questionCount: 4,
    timeAllowed: '50 mins',
    assessmentDescription: 'This assessment evaluates your ability to write in English for different purposes.',
    formDescription: 'You will need to complete various Reading tasks including emails, essays, and short responses.'
  }

  return (
    <>
      <ReadingProvider data={data}>
        <Outlet />
      </ReadingProvider>
    </>
  )
}
