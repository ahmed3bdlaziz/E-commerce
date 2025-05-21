import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (token && user.isAdmin) {
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

export default PrivateRoute
