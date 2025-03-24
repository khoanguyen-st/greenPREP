// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import IntroductionScreen from '@pages/IntroductionScreen';
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ReadingTestInstructions from "@pages/ReadingInstruction.jsx";

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
        path: "writing",
        element: <WritingTestPage />,
      },
      {
        path: "introduction",
        element: <IntroductionScreen/>      
      },
      {
        path: "readinginstruction",
        element: <ReadingTestInstructions/>      
      },
    ],
    
  },
  
];

export default PrivateRoute;
