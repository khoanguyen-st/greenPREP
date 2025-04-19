// GuestOnlyRoute.tsx
import { Navigate } from 'react-router-dom'

export function GuestOnlyRoute({ children }) {
  const token = localStorage.getItem('access_token')

  // if they’re already “logged in”, send them back into the app
  if (token) {
    return <Navigate to="/" replace />
  }

  return children
}
