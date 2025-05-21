import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { setRedirectFrom } from '../features/user/userSlice'

const LoginButton = ({ className, text = 'Sign In' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    // Store the current path as the redirect location
    dispatch(setRedirectFrom(location.pathname))
    navigate('/login')
  }

  return (
    <button
      onClick={handleClick}
      className={`btn ${className || 'btn-primary'}`}
    >
      {text}
    </button>
  )
}

export default LoginButton
