// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import Introduction from "../../features/Speaking/ui/components/Introduction";
import Part1 from "../../features/Speaking/ui/components/Part1";
import SpeakingPage from "../../pages/SpeakingPage";
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
        path: "writing",
        element: <WritingTestPage />,
      },
      {
        path: "speaking",
        element: <SpeakingPage />,
        children: [
          {
            index: true,
            element: <Introduction />,
          },
          {
            path: "part1",
            element: <Part1/>,
          }
        ]
      },
    ],
  },
];

export default PrivateRoute;
