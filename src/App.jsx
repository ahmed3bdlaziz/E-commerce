import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { FaCartShopping } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  About,
  Brands,
  Cart,
  Category,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  NewArrival,
  Orders,
  Products,
  Register,
  SingleProduct,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
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
        element: <Checkout />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'brands',
        element: <Brands />,
      },
      {
        path: 'newarrival',
        element: <NewArrival />,
      },

      {
        path: 'category/:id',
        element: <Category />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

export default function App() {
  return <RouterProvider router={router}></RouterProvider>
}
