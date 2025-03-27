import { ReadingProvider } from '@shared/context/reading-context'
import { Outlet } from 'react-router-dom'

import { READING_DATA } from '@/__mock/reading'

const ReadingPage = () => {
  return (
    <>
      <ReadingProvider data={READING_DATA}>
        <Outlet />
      </ReadingProvider>
    </>
  )
}

export default ReadingPage
