import HomePage from '@pages/HomePage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import SpeakingPage from '@pages/SpeakingPage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
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
      { path: 'speaking', element: <SpeakingPage /> },
      {
        path: 'listening',
        element: <ListeningPage />
      },
      {
        path: 'writing',
        element: <WritingTestPage />
      },
      {
        path: 'introduction',
        element: <IntroductionScreen />
      }
    ]
  }
]

export default PrivateRoute
