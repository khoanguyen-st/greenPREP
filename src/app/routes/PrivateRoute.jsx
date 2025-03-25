import PlayStopButton from '@features/listening/ui/PlayStopButton'
import { InstructionSpeaking } from '@features/speaking/ui/Instruction'
import { IntroductionSpeaking } from '@features/speaking/ui/Introduction'
import { InstructionWriting } from '@features/writing/ui/instruction'
import { IntroductionWriting } from '@features/writing/ui/Introduction'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import GrammarVocabPage from '@pages/GrammarVocabPage'
import HomePage from '@pages/HomePage'
import IntroductionScreen from '@pages/IntroductionScreen'
import Instruction from '@pages/listening/Instruction'
import Introduction from '@pages/listening/Introduction'
import ListeningPage from '@pages/ListeningPage'
import ReadingTestPage from '@pages/ReadingPage'
import { SpeakingPage } from '@pages/speaking'
import WaitingForApproval from '@pages/WaitingForApproval'
import { WritingPage } from '@pages/writing'

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
      {
        path: 'speaking',
        element: <SpeakingPage />,
        children: [
          {
            index: true,
            element: <IntroductionSpeaking />
          },
          {
            path: 'instruction',
            element: <InstructionSpeaking />
          },
          {
            path: 'test',
            element: <div>Test page</div>
          }
        ]
      }
    ]
  }
]

export default PrivateRoute
