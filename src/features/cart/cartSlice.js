import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// Get cart from localStorage
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

// Calculate initial cart values from localStorage
const calculateInitialCartValues = () => {
  const cartItems = getLocalStorage()
  if (cartItems.length === 0) {
    return { totalItems: 0, totalAmount: 0 }
  }

  return cartItems.reduce(
    (total, item) => {
      const { amount, price } = item
      total.totalItems += amount
      total.totalAmount += amount * price
      return total
    },
    { totalItems: 0, totalAmount: 0 }
  )
}

const { totalItems, totalAmount } = calculateInitialCartValues()

const initialState = {
  cartItems: getLocalStorage(),
  numItemsInCart: totalItems,
  cartTotal: totalAmount,
  shipping: 5.99,
  tax: totalAmount * 0.1, // 10% tax
  orderTotal: totalAmount + 5.99 + totalAmount * 0.1,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, color, size, amount, product } = action.payload

      // Check if item is already in cart
      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      )

      if (existingItem) {
        // Update quantity if item exists
        existingItem.amount += amount
        toast.success(`${product.name} quantity updated in cart!`, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } else {
        // Add new item to cart
        const newItem = {
          id,
          color,
          size,
          amount,
          image: product.image,
          price: product.price,
          name: product.name,
          product: id,
        }
        state.cartItems.push(newItem)

        // Add toast notification with product name
        toast.success(`${product.name} added to cart!`, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.cartItems))

      // Calculate cart totals
      cartSlice.caseReducers.calculateTotals(state)
    },

    removeFromCart: (state, action) => {
      const { id, color, size } = action.payload

      // Get the item name before removing it
      const itemToRemove = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      )
      const itemName = itemToRemove ? itemToRemove.name : 'Item'

      // Filter out the item to remove
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.cartItems))

      // Calculate cart totals
      cartSlice.caseReducers.calculateTotals(state)

      // Add toast notification with product name
      toast.error(`${itemName} removed from cart!`, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },

    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
      cartSlice.caseReducers.calculateTotals(state)
    },

    updateCartItemAmount: (state, action) => {
      const { id, color, size, amount } = action.payload

      // Find the item to update
      const item = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      )

      if (item) {
        item.amount = amount
        // toast.success(`${item.name} quantity updated!`, {
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // })
      }

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state.cartItems))

      // Calculate cart totals
      cartSlice.caseReducers.calculateTotals(state)
    },

    calculateTotals: (state) => {
      // Calculate number of items and cart total
      const { totalItems, totalAmount } = state.cartItems.reduce(
        (total, item) => {
          const { amount, price } = item
          total.totalItems += amount
          total.totalAmount += amount * price
          return total
        },
        { totalItems: 0, totalAmount: 0 }
      )

      // Update state
      state.numItemsInCart = totalItems
      state.cartTotal = totalAmount
      state.tax = totalAmount * 0.1 // 10% tax
      state.orderTotal = state.cartTotal + state.shipping + state.tax
    },
  },
})

export const { addToCart, removeFromCart, clearCart, updateCartItemAmount } =
  cartSlice.actions

export default cartSlice.reducer
