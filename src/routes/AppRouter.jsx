import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import Home from '../layout/Home'
import Alert from '../layout/Alert'
import Contacts from '../layout/Contacts'
import Products from '../layout/Products'
import NotFound from '../layout/NotFounds'

//logout
const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Home /> },
      { path: '/Home', element: <Home />},
      { path: '/register', element: <RegisterForm />},
      { path: '/login', element: <LoginForm />},
      { path: '/alert', element: <Alert />},
      { path: '/Products', element: <Products />},
      { path: '/contact', element: <Contacts />},
      { path: "*" , element : <NotFound />},
    ]
  }
])

//login
const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <Home /> },
      { path: '/Home', element: <Home />},
      { path: '/alert', element: <Alert />},
      { path: '/Products', element: <Products />},
      { path: '/contact', element: <Contacts />},
      { path: "*" , element : <NotFound />},
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
