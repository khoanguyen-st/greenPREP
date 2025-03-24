import AudioTest from "@pages/AudioTest.jsx";
import HomePage from "@pages/HomePage.jsx";
import IntroductionScreen from '@pages/IntroductionScreen';
import ListeningPage from "@pages/ListeningPage.jsx";
import SamplePage from "@pages/Sample.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import SubmissionScreen from "@shared/ui/Submission/SubmissionScreen.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";

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
            {
        path: "sample",
        element: <SamplePage/>
      },
                        {
        path: "success",
        element: <SubmissionScreen/>
      },
                        {
        path: "audio",
        element: <AudioTest/>
      },
    ],
  },

];

export default PrivateRoute;
