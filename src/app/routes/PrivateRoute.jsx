import HomePage from '@pages/HomePage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import InstructionsGrammarPage from '@pages/InstructionsGrammarPage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import ListeningPage from '@pages/ListeningPage.jsx'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import ReadingTestInstructions from '@features/reading/ui/ReadingInstruction.jsx'

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
        path: 'reading-instructions',
        element: <ReadingTestInstructions />
      },
      {
        path: 'introduction',
        element: <IntroductionScreen />
      },
      {
        path: 'waiting-for-approval',
        element: <WaitingForApproval />
      }
    ]
  }
]

export default PrivateRoute
