import { useState } from 'react'
import { FormRaw, SubmitBtn } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  registerStart,
  registerSuccess,
  registerFailed,
} from '../features/user/userSlice'
import { toast } from 'react-toastify'
import { selectTranslations } from '../features/language/languageSlice'

const Register = () => {
  const translations = useSelector(selectTranslations)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    dispatch(registerStart())

    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful registration
      const userData = {
        userName: formData.userName,
        email: formData.email,
        name: formData.userName,
      }

      // Simulate API delay
      setTimeout(() => {
        dispatch(registerSuccess(userData))
        toast.success('Registration successful!')
        navigate('/')
      }, 1000)
    } catch (error) {
      dispatch(registerFailed(error.message || 'Registration failed'))
      toast.error(error.message || 'Registration failed')
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      <form onSubmit={handleSubmit} className="w-96 shadow-md p-5 rounded">
        <h2 className="text-center text-3xl uppercase font-bold">
          {translations.register}
        </h2>

        {error && (
          <div className="alert alert-error mb-4">
            <p>{error}</p>
          </div>
        )}

        <FormRaw
          label="user name"
          type="text"
          name="userName"
          placeHolder="username"
          value={formData.userName}
          onChange={handleChange}
        />

        <FormRaw
          label="email"
          type="email"
          name="email"
          placeHolder="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormRaw
          label="password"
          type="password"
          name="password"
          placeHolder="password"
          value={formData.password}
          onChange={handleChange}
        />

        <FormRaw
          label="confirm password"
          type="password"
          name="confirmPassword"
          placeHolder="confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <SubmitBtn
          submitted={isLoading ? 'Registering...' : 'Sign up'}
          disabled={isLoading}
        />

        <div className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
