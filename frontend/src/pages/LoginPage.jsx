import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { selectTranslations } from '../features/language/languageSlice'

const LoginPage = () => {
  const translations = useSelector(selectTranslations)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.user)

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      const checkoutIntent = localStorage.getItem('checkoutAfterLogin')
      if (checkoutIntent === 'true') {
        // Clear the flag
        localStorage.removeItem('checkoutAfterLogin')
        navigate('/checkout')
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  // Function to fill in demo credentials and login
  const loginWithDemo = (demoUser, demoPass) => {
    setUsername(demoUser)
    setPassword(demoPass)
    // Use setTimeout to ensure state is updated before submitting
    setTimeout(() => {
      dispatch(loginUser({ username: demoUser, password: demoPass }))
    }, 100)
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center mt-2">
            <h1 className="text-5xl font-bold">{translations.signIn}</h1>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-neutral w-full block ${
                    loading ? 'loading' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <div className="divider">Demo Login</div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => loginWithDemo('admin', 'admin123')}
                className="btn btn-sm btn-outline"
                disabled={loading}
              >
                Admin
              </button>
              <button
                onClick={() => loginWithDemo('user', 'user123')}
                className="btn btn-sm btn-outline"
                disabled={loading}
              >
                User
              </button>
              <button
                onClick={() => loginWithDemo('guest', 'guest123')}
                className="btn btn-sm btn-outline"
                disabled={loading}
              >
                Guest
              </button>
            </div>

            <div className="divider">Demo Credentials</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
