// import { lazy } from 'react';
import HomePage from '@pages/HomePage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'

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
        path: 'reading',
        element: <ReadingTestPage />
      }
    ]
  }
]

export default PrivateRoute
