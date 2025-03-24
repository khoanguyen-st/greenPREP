import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import IntroductionScreen from '@pages/IntroductionScreen';
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ListeningPage from "@pages/ListeningPage.jsx";
import DesktopRejectRequestPage from "../../pages/DesktopRejectRequestPage.jsx";


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
        path: "rejectpage",
        element: <DesktopRejectRequestPage />,
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