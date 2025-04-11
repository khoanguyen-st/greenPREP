import PrivateRoute from '@app/routes/PrivateRoute'
import PublicRoute from '@app/routes/PublicRoute'
import ForgotPassword from '@pages/ForgotPassword'
import LoginPage from '@pages/LoginPage'
import NotFound from '@pages/not-found-page'
import ResetPassword from '@pages/ResetPassword'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'
import { Outlet, createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(state => state.auth.isAuth)
  return isAuth ? children : <Navigate to="/login" replace />
}

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      errorElement: <NotFound />,
      children: [
        ...PublicRoute,
        {
          path: '/',
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [...PrivateRoute]
        }
      ]
    }
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)

const RouteProvider = () => {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true
      }}
      router={router}
    />
  )
}
export default RouteProvider
