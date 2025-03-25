import IntroductionScreen from '@pages/IntroductionScreen'
import SpeakingPage from '@pages/SpeakingPage'
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage'
import GrammarVocabPage from '@pages/GrammarVocabPage'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import WaitingForApproval from '@pages/WaitingForApproval'
import Introduction from '@features/Listening/ui/Introduction'
import InstructionListening from '@features/Listening/ui/Instruction'
import InstructionReading from '@features/reading/ui/ReadingInstruction'
import { WritingPage } from '@pages/writing'
import { InstructionWriting } from '@features/writing/ui/instruction'
import { IntroductionWriting } from '@features/writing/ui/Introduction'
import { ListeningPage } from '@pages/listening'
import { ReadingPage } from '@pages/reading'
import { IntroductionReading } from '@features/reading/ui/ReadingIntroduction'

import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute'

const PrivateRoute = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
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
            element: <InstructionListening />
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
        element: <ReadingPage />,
        children: [
          {
            index: true,
            element: <IntroductionReading />
          },
          {
            path: 'instruction',
            element: <InstructionReading />
          },
          {
            path: 'test',
            element: <div>Test page</div>
          }
        ]
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
      }
    ]
  }
]

export default PrivateRoute
