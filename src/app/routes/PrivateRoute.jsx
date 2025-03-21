// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
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
        path: "readinginstruction",
        element: <ReadingTestInstructions />,
      },
    ],
    
  },
];

export default PrivateRoute;
