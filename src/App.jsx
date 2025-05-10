import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  About,
  Cart,
  Category,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  LoginPage,
  Orders,
  Products,
  SingleProduct,
} from './pages'
import { ErrorElement } from './components'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import LoadingScreen from './components/LoadingScreen'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'orders',
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: 'category/:id',
        element: <Category />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <Error />,
  },
  // {
  //   path: '/register',
  //   element: <Register />,
  //   errorElement: <Error />,
  // },
])

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingFinished = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
