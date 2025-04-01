import StudentProfile from '@features/profile/ui/student-profile'
import GrammarPage from '@pages/grammar'
import GrammarIntroduction from '@pages/grammar/grammar-introduction'
import GrammarTest from '@pages/grammar/grammar-test'
import HomePage from '@pages/home-page'
import IntroductionPage from '@pages/introduction-page'
import ListeningPage from '@pages/listening'
import ListeningHeadphoneCheck from '@pages/listening/listening-headphonecheck'
import ListeningIntroduction from '@pages/listening/listening-introduction'
import ListeningTest from '@pages/listening/listening-test'
import ProfilePage from '@pages/profile'
import ReadingPage from '@pages/reading'
import ReadingIntroduction from '@pages/reading/reading-instroduction'
import ReadingTest from '@pages/reading/reading-test'
import DesktopRejectRequestPage from '@pages/reject-page'
import SpeakingPage from '@pages/speaking'
import MicrophoneCheck from '@pages/speaking/micro-check'
import SpeakingIntroduction from '@pages/speaking/speaking-introduction'
import SpeakingIntroparts from '@pages/speaking/speaking-introparts'
import SpeakingParts from '@pages/speaking/speaking-parts'
import SubmissionPage from '@pages/submission-page'
import WaitingForApproval from '@pages/waiting-for-approval'
import WritingPage from '@pages/writing'
import WritingIntroduction from '@pages/writing/writing-introduction'
import WritingTest from '@pages/writing/writing-test'

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
            element: <SpeakingIntroparts />
          },
          {
            path: 'test/:part',
            element: <SpeakingParts />
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
        element: <IntroductionPage />
      },
      {
        path: 'waiting-for-approval',
        element: <WaitingForApproval />
      },
      {
        path: 'complete-test',
        element: <SubmissionPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <StudentProfile />
          }
        ]
      }
    ]
  }
]

export default PrivateRoute
