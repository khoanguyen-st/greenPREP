import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import SpeakingPage from '@pages/SpeakingPage'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import ReadingPage from '@pages/Reading-Question.jsx'

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
      },
      {
        path: 'grammarvocab',
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
        path: 'speaking',
        element: <SpeakingPage />
      },
      {
        path: 'reading-question',
        element: <ReadingPage />
      }
    ]
  }
]

export default PrivateRoute
