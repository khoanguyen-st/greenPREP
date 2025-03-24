// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import WritingTestPage from "@pages/WritingTestPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import WritingTest from "@features/writing/ui/WritingTest"


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
        path: "taking-writing",
        element: <WritingTest />,
      },
    ],
  },
];

export default PrivateRoute;
