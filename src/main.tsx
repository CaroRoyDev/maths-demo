import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { ErrorPage } from './pages'
import { AppLayout } from './pages/layouts'
import { APP_ROUTES } from './routes'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    errorElement: <ErrorPage />,
    children: [...APP_ROUTES],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </>
)
