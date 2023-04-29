import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MissingContent, MapContainer, SignIn, SignUp } from 'components'
import { Main } from 'templates/Main'
import axios from 'axios'

import { setupInterceptorsTo } from '../src/config/interceptors'

function App() {
setupInterceptorsTo(axios)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <MissingContent />,
      children: [
        { index: true, element: <div>Головна</div> },
        {
          path: 'map',
          element: <MapContainer />
        }
      ]
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
