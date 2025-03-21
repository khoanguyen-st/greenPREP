// Define public routes accessible to all users
import QuestionNavigatior from "../../shared/ui/QuestionNavigatior/QuestionNavigatior";
const PublicRoute = [
  {
    path: "login",
    element: (
      <QuestionNavigatior
        values={[
          { type: "answered" },
          { type: "unanswered" },
          { type: "flagged" },
          { type: "answered-flagged" },
          { type: "answered" },
          { type: "unanswered" },
          { type: "flagged" },
          { type: "answered-flagged" },
          { type: "answered" },
          { type: "unanswered" },
          { type: "answered" },
          { type: "flagged" },
          { type: "answered-flagged" },
          { type: "answered" },
          { type: "unanswered" },
          { type: "flagged" },
          { type: "answered" },
          { type: "answered-flagged" },
          { type: "unanswered" },
          { type: "unanswered" },
        ]}
      />
    ),
  },
];

export default PublicRoute;
