// import { lazy } from 'react';
import HomePage from '@pages/HomePage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import PlayStopButton from '@features/listening/ui/PlayStopButton'

const PrivateRoute = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'homepage',
        element: <HomePage />
      },
      {
        path: 'writing',
        element: <WritingTestPage />
      },
      {
        path: 'play-stop-button',
        element: <PlayStopButton />
      }
    ]
  }
]

export default PrivateRoute
