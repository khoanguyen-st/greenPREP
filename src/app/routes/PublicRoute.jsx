import FlagButton from '../../shared/ui/FLagButton/FlagButton.jsx'
const PublicRoute = [
  {
    path: 'login',
    element: <FlagButton onFlag={() => console.log('clicked')} initialFlagged={true} />
  }
]

export default PublicRoute
