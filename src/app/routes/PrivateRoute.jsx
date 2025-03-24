import HomePage from "@pages/HomePage.jsx";
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
