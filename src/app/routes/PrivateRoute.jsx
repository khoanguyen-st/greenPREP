import HomePage from "@pages/HomePage.jsx";
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
    ],
  },
];

export default PrivateRoute;
