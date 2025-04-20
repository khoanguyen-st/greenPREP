import RegisterPage from '@pages/register-page'

import { GuestOnlyRoute } from './GuestOnlyRoute'

const PublicRoute = [
  {
    path: 'register',
    element: (
      <GuestOnlyRoute>
        <RegisterPage />
      </GuestOnlyRoute>
    )
  }
]

export default PublicRoute
