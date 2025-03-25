import FlagButton from '../../shared/ui/FlagButton/FlagButton.jsx'
// Define public routes accessible to all users

import QuestionNavigator from '../../shared/ui/QuestionNavigatior/QuestionNavigatior'

const PublicRoute = [
  {
    path: "login",
    element: <FlagButton onFlag={() => console.log("clicked")} initialFlagged={true} />
  },
];

    path: 'login',
    element: (
      <QuestionNavigator
        values={[
          { type: 'answered' },
          { type: 'flagged' },
          { type: 'unanswered' },
          { type: 'answered' },
          { type: 'flagged' },
          { type: 'unanswered' },
          { type: 'answered' },
          { type: 'flagged' },
          { type: 'unanswered' }
        ]}
        action={() => console.log('clicked')}
        position={1}
      />
    )
  }
]

export default PublicRoute
export default PublicRoute
