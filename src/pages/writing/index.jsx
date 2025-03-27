import { WritingProvider } from '@shared/context/writing-context'
import { Outlet } from 'react-router-dom'

import { WRITING_DATA } from '@/__mock/writing'

const WritingPage = () => {
  return (
    <>
      <WritingProvider data={WRITING_DATA}>
        <Outlet />
      </WritingProvider>
    </>
  )
}

export default WritingPage
