import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MissingContent, MapContainer, SignIn, SignUp } from './components'
import { Main } from './templates/Main'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <MissingContent />,
      children: [
        { index: true, element: <div>Home</div> },
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
