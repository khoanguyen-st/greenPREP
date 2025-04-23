import Profile from '@features/profile/ui/profile'
import WaitingForApproval from '@features/welcome/ui/waiting-for-approval'
import GrammarPage from '@pages/grammar'
import GrammarIntroduction from '@pages/grammar/grammar-introduction'
import GrammarTest from '@pages/grammar/grammar-test'
import HomePage from '@pages/home-page'
import IntroductionPage from '@pages/introduction-page'
import ListeningPage from '@pages/listening'
import HeadphoneCheck from '@pages/listening/listening-headphonecheck'
import ListeningIntroduction from '@pages/listening/listening-introduction'
import ListeningTest from '@pages/listening/listening-test'
import ReadingPage from '@pages/reading'
import ReadingIntroduction from '@pages/reading/reading-introduction'
import ReadingTest from '@pages/reading/reading-test'
import DesktopRejectRequestPage from '@pages/reject-page'
import SpeakingPage from '@pages/speaking'
import MicrophoneCheck from '@pages/speaking/micro-check'
import SpeakingIntroduction from '@pages/speaking/speaking-introduction'
import SpeakingParts from '@pages/speaking/speaking-parts'
import SubmissionPage from '@pages/submission-page'
import WritingPage from '@pages/writing'
import WritingIntroduction from '@pages/writing/writing-introduction'
import WritingTest from '@pages/writing/writing-test'
import TestLayout from '@shared/ui/test-layout'

import { ProtectedRoute } from './ProtectedRoute'

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
            element: (
              <TestLayout>
                <WritingTest />
              </TestLayout>
            )
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
            element: <HeadphoneCheck />
          },
          {
            path: 'test',
            element: (
              <TestLayout>
                <ListeningTest />
              </TestLayout>
            )
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
            element: (
              <TestLayout>
                <GrammarTest />
              </TestLayout>
            )
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
            path: 'test/:part',
            element: (
              <TestLayout>
                <SpeakingParts />
              </TestLayout>
            )
          },
          {
            path: 'microphonecheck',
            element: <MicrophoneCheck />
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
            element: (
              <TestLayout>
                <ReadingTest />
              </TestLayout>
            )
          }
        ]
      },
      {
        path: 'rejected',
        element: <DesktopRejectRequestPage />
      },
      {
        path: 'introduction',
        element: <IntroductionPage />
      },
      {
        path: 'waiting-for-approval/:userId/:sessionId/:requestId',
        element: <WaitingForApproval />
      },
      {
        path: 'complete-test',
        element: <SubmissionPage />
      },
      {
        path: 'profile/:userId',
        element: <Profile />
      }
    ]
  }
]

export default PrivateRoute
