import HomePage from "@pages/HomePage.jsx";

import GrammarVocabPage from "@pages/GrammarVocabPage.jsx";
import InstructionsGrammarPage from "@pages/InstructionsGrammarPage.jsx";
import IntroductionScreen from '@pages/IntroductionScreen';
import WritingTestPage from "@pages/WritingTestPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ListeningPage from "@pages/ListeningPage.jsx";


const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "grammar-vocab",
        element: <GrammarVocabPage />,
      },
      {
        path: "grammar-instructions",
        element: <InstructionsGrammarPage />,
      },
      {
        path: "listening",
        element: <ListeningPage />,

      },
      {
        path: "test",
        element: <WritingTestPage />,
      },
      {
        path: "introduction",
        element: <IntroductionScreen/>      
      },
    ],
  },
  
];

export default PrivateRoute;
