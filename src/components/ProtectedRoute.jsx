import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { currentUser: user } = useSelector((state) => state.user)
  const location = useLocation()

  if (!user) {
    // Redirect to login page with the current location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute
