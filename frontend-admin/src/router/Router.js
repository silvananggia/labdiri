// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Error = lazy(() => import('../views/Error'))
const Login = lazy(() => import('../views/Login'))
const NotAuthorized = lazy(() => import('../views/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/admin/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/admin',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/admin/login',
      element: <BlankLayout />,
      children: [{ path: '/admin/login', element: <Login /> }]
    },
  
    {
      path: '/admin/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/admin/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
