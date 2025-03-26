import { GrammarIntroduction } from '@features/grammar/ui/grammar-introduction'
import ListeningHeadphoneCheck from '@features/listening/ui/listening-headphonecheck'
import { ListeningIntroduction } from '@features/listening/ui/listening-introduction'
import PlayStopButton from '@features/listening/ui/PlayStopButton'
import { ReadingIntroduction } from '@features/reading/ui/reading-instroduction'
import ReadingMatchingQuestion from '@features/reading/ui/ReadingMatchingQuestion'
import ReadingOrderingQuestion from '@features/reading/ui/ReadingOrderingQuestion'
import { SpeakingIntroduction } from '@features/speaking/ui/speaking-introduction'
import { WritingIntroduction } from '@features/writing/ui/writing-introduction'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage'
import { GrammarPage } from '@pages/grammar'
import HomePage from '@pages/HomePage'
import IntroductionScreen from '@pages/IntroductionScreen'
import { ListeningPage } from '@pages/listening'
import { ReadingPage } from '@pages/reading'
import { SpeakingPage } from '@pages/speaking'
import WaitingForApproval from '@pages/WaitingForApproval'
import { WritingPage } from '@pages/writing'
import MicrophoneTest from '@shared/ui/MicrophoneTest/MicrophoneTest'
import SubmissionScreen from '@shared/ui/Submission/SubmissionScreen'
import Introparts from '@features/speaking/ui/Introparts'
import Parts from '@features/speaking/ui/Parts'

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
          }
          // {
          //   path: 'test',
          //   element: <WritingTest />
          // }
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
            path: 'headphonecheck',
            element: <ListeningHeadphoneCheck />
          },
          {
            path: 'test',
            element: <div>Listening Test page</div>
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
            path: 'instruction/:part',
            element: <Introparts />
          },
          {
            path: 'test/:part',
            element: <Parts />
          },
          {
            path: 'microphonetest',
            element: <MicrophoneTest />
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
