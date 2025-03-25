import IntroductionScreen from '@pages/IntroductionScreen'
import SpeakingPage from '@pages/SpeakingPage'
import PlayStopButton from '@features/listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage'
import WritingTestPage from '@pages/WritingTestPage'
import GrammarVocabPage from '@pages/GrammarVocabPage'
import ListeningPage from '@pages/ListeningPage'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import ReadingTestPage from '@pages/ReadingPage'
import WaitingForApproval from '@pages/WaitingForApproval'
import Introduction from '@features/listening/ui/Introduction'
import Instruction from '@features/listening/ui/Instruction'

import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute'

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
        element: <ListeningPage />,
        children: [
          {
            index: true,
            element: <Introduction />
          },
          {
            path: 'instruction',
            element: <Instruction />
          },
          {
            path: 'test',
            element: <div>Test page</div>
          }
        ]
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
      { path: 'speaking', element: <SpeakingPage /> }
    ]
  }
]

export default PrivateRoute
