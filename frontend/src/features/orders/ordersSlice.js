import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  selectedOrder: null,
}

// Load orders from localStorage if available
const loadOrdersFromStorage = () => {
  try {
    const savedOrders = localStorage.getItem('orders')
    return savedOrders ? JSON.parse(savedOrders) : []
  } catch (error) {
    console.error('Error loading orders from localStorage:', error)
    return []
  }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    ...initialState,
    orders: loadOrdersFromStorage(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
      // Save to localStorage
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload
      const orderIndex = state.orders.findIndex((order) => order.id === orderId)

      if (orderIndex !== -1) {
        state.orders[orderIndex].paymentStatus = status
        // Update in localStorage
        localStorage.setItem('orders', JSON.stringify(state.orders))
      }
    },
  },
})

export const {
  addOrder,
  setSelectedOrder,
  clearSelectedOrder,
  updateOrderStatus,
} = ordersSlice.actions

export default ordersSlice.reducer
