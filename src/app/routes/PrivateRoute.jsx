// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
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
    ],
  },
];

export default PrivateRoute;
