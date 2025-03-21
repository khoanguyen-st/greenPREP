// import { lazy } from 'react';
import HomePage from "@pages/HomePage.jsx";
import GrammarVocabPage from "@pages/GrammarVocabPage.jsx";
import IntructionsGrammarPage from "@pages/IntructionsGrammarPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import GrammarVocabPage from "@pages/GrammarVocabPage.jsx";
import IntructionsGrammarPage from "@pages/IntructionsGrammarPage.jsx";

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
        path: "grammar-vocab",
        element: <GrammarVocabPage />,
      },
      {
        path: "grammar-instructions",
        element: <IntructionsGrammarPage />,
      },
      {
        path: "grammar-vocab",
        element: <GrammarVocabPage />,
      },
      {
        path: "grammar-instructions",
        element: <IntructionsGrammarPage />,
      },
    ],
  },
];

export default PrivateRoute;
