import SampleTestPage from '@/pages/Sample'
// import { lazy } from 'react';
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import ListeningPage from '@pages/ListeningPage.jsx'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import HomePage from '@pages/HomePage.jsx'
import InstructionsGrammarPage from '@pages/InstructionsGrammarPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import ListeningPage from '@pages/ListeningPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import TestAudioPage from '../../pages/AudioTest'
import SubmissionScreen from '../../shared/ui/Submission/SubmissionScreen'
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
        path: 'sample',
        element: <SampleTestPage />
      },
                        {
        path: 'audio-test',
        element: <TestAudioPage />
      },
         {
        path: 'success',
        element: <SubmissionScreen />
      }
    ]
  }
]

export default PrivateRoute
