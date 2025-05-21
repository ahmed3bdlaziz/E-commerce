import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user)

  // Check if user is authenticated and has admin role
  if (!isAuthenticated || currentUser?.username !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
