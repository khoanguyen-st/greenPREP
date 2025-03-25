// import { lazy } from 'react';
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import HomePage from '@pages/HomePage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import SampleDrop from '../../pages/SampleDropdown'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'

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
        path: 'dropdown',
        element: <SampleDrop />
      }
    ]
  }
]

export default PrivateRoute
