import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import HomePage from '@pages/HomePage.jsx'
import InstructionsGrammarPage from '@pages/InstructionsGrammarPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import SpeakingPage from '@pages/SpeakingPage'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
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
      {
        path: 'grammar-vocab',
        element: <GrammarVocabPage />
      },
      {
        path: 'grammar-instructions',
        element: <InstructionsGrammarPage />
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
        path: 'writing',
        element: <WritingTestPage />
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
      { path: 'speaking', element: <SpeakingPage /> }
    ]
  }
]

export default PrivateRoute
