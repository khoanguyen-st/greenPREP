import { GrammarIntroduction } from '@features/grammar/ui/grammar-introduction'
import GrammarTest from '@features/grammar/ui/grammar-test'
import ListeningHeadphoneCheck from '@features/listening/ui/listening-headphonecheck'
import { ListeningIntroduction } from '@features/listening/ui/listening-introduction'
import { ReadingIntroduction } from '@features/reading/ui/reading-instroduction'
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
import ListeningTest from '@features/listening/ui/test'
import SubmissionScreen from '@shared/ui/Submission/SubmissionScreen'
import WritingTest from '@features/writing/ui/writing-test'
import ReadingTest from '@features/reading/ui/ReadingTest'
import { Introparts } from '@features/speaking/ui/Introparts'
import { Parts } from '@features/speaking/ui/Parts'

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
            path: 'headphonecheck',
            element: <ListeningHeadphoneCheck />
          },
          {
            path: 'test',
            element: <ListeningTest />
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
            element: <GrammarTest />
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
            element: <ReadingTest />
          }
        ]
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
