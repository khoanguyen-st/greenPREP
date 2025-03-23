import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import IntroductionScreen from '@pages/IntroductionScreen';
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
        path: "listening",
        element: <ListeningPage />,
      },
      {
        path: "writing",
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
