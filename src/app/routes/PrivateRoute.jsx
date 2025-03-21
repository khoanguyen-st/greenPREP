// import { lazy } from 'react';
import HomePage from '@pages/HomePage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'

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
        path: 'waiting-for-approval',
        element: <WaitingForApproval />
      }
    ]
  }
]

export default PrivateRoute
