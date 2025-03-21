// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
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
        path: "rejectpage",
        element: <DesktopRejectRequestPage />,
      },
      {
        path: "writing",
        element: <WritingTestPage />,
      },
    ],
  },
];

export default PrivateRoute;
