// Define public routes accessible to all users

import QuestionNavigator from "../../shared/ui/QuestionNavigatior/QuestionNavigatior";

const PublicRoute = [
  {
    path: "login",
    element: (
      <QuestionNavigator
        values={[
          { type: "answered" },
          { type: "flagged" },
          { type: "unanswered" },
          { type: "answered" },
          { type: "flagged" },
          { type: "unanswered" },
          { type: "answered" },
          { type: "flagged" },
          { type: "unanswered" },
        ]}
        action={(index) => console.log("clicked")}
        position={1}
      />
    ),
  },
];

export default PublicRoute;
