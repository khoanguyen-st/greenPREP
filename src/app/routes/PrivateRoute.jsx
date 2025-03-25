import IntroductionScreen from '@pages/IntroductionScreen'
import SpeakingPage from '@pages/SpeakingPage'
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage'
import GrammarVocabPage from '@pages/GrammarVocabPage'
import ListeningPage from '@pages/ListeningPage'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import ReadingTestPage from '@pages/ReadingPage'
import WaitingForApproval from '@pages/WaitingForApproval'
import Introduction from '@pages/listening/Introduction'
import Instruction from '@pages/listening/Instruction'
import { WritingPage } from '@pages/writing'
import { InstructionWriting } from '@features/writing/ui/WritingInstruction'
import { IntroductionWriting } from '@features/writing/ui/WritingIntroduction'

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
        element: <WritingPage />,
        children: [
          {
            index: true,
            element: <IntroductionWriting />
          },
          {
            path: 'instruction',
            element: <InstructionWriting />
          }
        ]
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
