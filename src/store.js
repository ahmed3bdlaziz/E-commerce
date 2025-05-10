import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import cartReducer from './features/cart/cartSlice'
import ordersReducer from './features/orders/ordersSlice'
import languageReducer from './features/language/languageSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    language: languageReducer,
    user: userReducer,
  },
})
