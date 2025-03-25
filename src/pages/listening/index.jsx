import { ListeningProvider } from '@shared/context/listening-context'
import { Outlet } from 'react-router-dom'

export const ListeningPage = () => {
  const data = {
    testName: 'Aptis General Practice Test',
    section: 'Listening',
    questionCount: 4,
    timeAllowed: '50 mins',
    assessmentDescription: 'This assessment evaluates your ability to write in English for different purposes.',
    formDescription: 'You will need to complete various Listening tasks including emails, essays, and short responses.'
  }

  return (
    <>
      <ListeningProvider data={data}>
        <Outlet />
      </ListeningProvider>
    </>
  )
}
