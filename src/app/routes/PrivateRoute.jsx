import HomePage from '@pages/HomePage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import ReadingQuestion from '@pages/Reading-Question'

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
        path: 'grammar-vocab',
        element: <GrammarVocabPage />
      },
      {
        path: 'listening',
        element: <ListeningPage />
      },
      {
        path: 'rejectpage',
        element: <DesktopRejectRequestPage />
      },

      {
        path: 'reading',
        element: <ReadingTestPage />
      },
      {
        path: 'introduction',
        element: <IntroductionScreen />
      },
      {
        path: 'waiting-for-approval',
        element: <WaitingForApproval />
      },
      {
        path: 'reading-question',
        element: <ReadingQuestion />
      }
    ]
  }
]

export default PrivateRoute
