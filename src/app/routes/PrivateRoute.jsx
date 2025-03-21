// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import QuestionPage from "../../pages/QuestionPage";
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
        path: "question",
        element: <QuestionPage />,
      },
    ],
  },
];

export default PrivateRoute;
