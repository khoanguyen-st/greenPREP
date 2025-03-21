// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import WaitingForApproval from "@pages/WaitingForApproval.jsx";
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
        path: "waiting-approval",
        element: <WaitingForApproval />,
      },
    ],
  },
];

export default PrivateRoute;
