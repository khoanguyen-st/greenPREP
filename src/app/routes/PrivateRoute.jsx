import IntroductionScreen from '@pages/IntroductionScreen'
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import WaitingForApproval from '@pages/WaitingForApproval'
import { WritingPage } from '@pages/writing'
import { WritingIntroduction } from '@features/writing/ui/writing-introduction'
import { ListeningPage } from '@pages/listening'
import { SpeakingIntroduction } from '@features/speaking/ui/speaking-introduction'
import { ListeningIntroduction } from '@features/Listening/ui/listening-introduction'
import { GrammarPage } from '@pages/grammar'
import { GrammarIntroduction } from '@features/grammar/ui/grammar-introduction'
import { SpeakingPage } from '@pages/speaking'
import { ReadingPage } from '@pages/reading'
import { ReadingIntroduction } from '@features/reading/ui/reading-instroduction'
import WritingTest from '@features/writing/ui/writing-test'
import MicrophoneTest from '@shared/ui/MicrophoneTest/MicrophoneTest'
import ReadingMatchingQuestion from '@features/reading/ui/ReadingMatchingQuestion'
import ReadingOrderingQuestion from '@features/reading/ui/ReadingOrderingQuestion'
import ListeningTestPart1 from '@features/Listening/ui/test-part1'
import ListeningTestPart2 from '@features/Listening/ui/test-part2'
import SubmissionScreen from '@shared/ui/Submission/SubmissionScreen'

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
            element: <WritingIntroduction />
          },
          {
            path: 'test',
            element: <WritingTest />
          }
        ]
      },
      {
        path: 'listening',
        element: <ListeningPage />,
        children: [
          {
            index: true,
            element: <ListeningIntroduction />
          },
          {
            path: 'test-part1',
            element: <ListeningTestPart1 />
          },
          {
            path: 'test-part2',
            element: <ListeningTestPart2 />
          }
        ]
      },
      {
        path: 'grammar',
        element: <GrammarPage />,
        children: [
          {
            index: true,
            element: <GrammarIntroduction />
          },
          {
            path: 'test',
            element: <div>Grammar Test page</div>
          }
        ]
      },
      {
        path: 'speaking',
        element: <SpeakingPage />,
        children: [
          {
            index: true,
            element: <SpeakingIntroduction />
          },
          {
            path: 'microphonetest',
            element: <MicrophoneTest />
          },
          {
            path: 'test',
            element: <div>Speaking Test page</div>
          }
        ]
      },
      {
        path: 'reading',
        element: <ReadingPage />,
        children: [
          {
            index: true,
            element: <ReadingIntroduction />
          },
          {
            path: 'test',
            element: <ReadingMatchingQuestion />
          },
          {
            path: 'ordering',
            element: <ReadingOrderingQuestion />
          },
          {
            path: 'part3',
            element: <div>Reading Part 3</div>
          }
        ]
      },
      {
        path: 'play-stop-button',
        element: <PlayStopButton />
      },

      {
        path: 'rejectpage',
        element: <DesktopRejectRequestPage />
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
        path: 'complete-test',
        element: <SubmissionScreen />
      }
    ]
  }
]

export default PrivateRoute
