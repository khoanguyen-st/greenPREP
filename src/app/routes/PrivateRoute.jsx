// import { lazy } from 'react';
import PlayStopButton from '@features/Listening/ui/PlayStopButton'
import HomePage from '@pages/HomePage.jsx'
import GrammarVocabPage from '@pages/GrammarVocabPage.jsx'
import WritingTestPage from '@pages/WritingTestPage.jsx'
import IntroductionScreen from '@pages/IntroductionScreen'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import ListeningPage from '@pages/ListeningPage.jsx'
import DesktopRejectRequestPage from '@pages/DesktopRejectRequestPage.jsx'
import ReadingTestPage from '@pages/ReadingPage.jsx'
import WaitingForApproval from '@pages/WaitingForApproval.jsx'
import InstructionsGrammarPage from '@pages/InstructionsGrammarPage.jsx'
import ReadingTestInstructions from '@features/reading/ui/ReadingInstruction.jsx'

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
        path: 'grammar-vocab',
        element: <GrammarVocabPage />
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
        path: 'grammar-instructions',
        element: <InstructionsGrammarPage />
      },
      {
        path: 'listening',
        element: <ListeningPage />
      },
      {
        path: 'reject-page',
        element: <DesktopRejectRequestPage />
      },
      {
        path: 'rejectpage',
        element: <DesktopRejectRequestPage />
      },
      {
        path: 'writing',
        element: <WritingTestPage />
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
        path: 'reading-instructions',
        element: <ReadingTestInstructions />
      },
    ]
  }
     
    
    ]


export default PrivateRoute
