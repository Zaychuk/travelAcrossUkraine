import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MissingContent, MapContainer, SignIn, SignUp, Collections, Categories, Users, Home, Locations } from 'components'
import { Main } from 'templates/Main'
import axios from 'axios'

import { setupInterceptorsTo } from '../src/config/interceptors'

interface IMenuItem {
  index?: boolean
  path?: string
  element: JSX.Element
}
function App() {
  setupInterceptorsTo(axios)
  const getMenuItems = (): IMenuItem[] => {
    let menuItems: IMenuItem[] = [
      { index: true, element: <Home /> },
      {
        path: 'map',
        element: <MapContainer />
      },
      {
        path: '/collections',
        element: <Collections />
      }
    ]

    if (localStorage.getItem('role') === 'Admin') {
      menuItems = menuItems.concat([
        {
          path: '/categories',
          element: <Categories />
        },
        {
          path: '/users',
          element: <Users />
        },
        {
          path: '/locations',
          element: <Locations />
        }
      ])
    }

    return menuItems
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <MissingContent />,
      children: getMenuItems()
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ])

  return (
    // eslint-disable-next-line react/jsx-fragments
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

App.displayName = 'App'

export default App
