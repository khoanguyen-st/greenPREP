import FlagButton from '@shared/ui/flag-button'

const PublicRoute = [
  {
    path: 'login',
    // eslint-disable-next-line no-console
    element: <FlagButton onFlag={() => console.log('clicked')} initialFlagged={true} />
  }
]

export default PublicRoute
