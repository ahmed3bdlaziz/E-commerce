import { createSlice } from '@reduxjs/toolkit'

// Dummy user data for authentication
const dummyUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
  },
  {
    id: 3,
    username: 'guest',
    password: 'guest123',
    name: 'Guest User',
    role: 'guest',
  },
]

// Check if user data exists in localStorage
const storedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialState = {
  currentUser: storedUser,
  isAuthenticated: !!storedUser,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.currentUser = action.payload
      state.error = null
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.currentUser = null
      state.error = action.payload
      // Remove user from localStorage
      localStorage.removeItem('user')
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.currentUser = null
      state.error = null
      // Remove user from localStorage
      localStorage.removeItem('user')
    },
  },
})

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions

// Async thunk for login
export const loginUser = (credentials) => (dispatch) => {
  dispatch(loginStart())

  // Simulate API call with setTimeout
  setTimeout(() => {
    const user = dummyUsers.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    )

    if (user) {
      // Remove password from user object before storing in state
      const { password, ...userWithoutPassword } = user
      dispatch(loginSuccess(userWithoutPassword))
    } else {
      dispatch(loginFailure('Invalid username or password'))
    }
  }, 800) // Simulate network delay
}

export default userSlice.reducer
