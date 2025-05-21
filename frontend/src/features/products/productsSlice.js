import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/data'
import { products_url } from '../../utils/constants'

// Async thunk for fetching all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch(products_url, {
        params: {
          populate: '*',
        },
      })
      return response.data.data
    } catch (error) {
      console.log(error)

      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

// Async thunk for fetching a single product
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (id, thunkAPI) => {
    try {
      const response = await customFetch(`${products_url}/${id}`, {
        params: {
          populate: '*',
        },
      })
      return response.data.data
    } catch (error) {
      console.log(error)

      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

const initialState = {
  products: [],
  filteredProducts: [],
  singleProduct: null,
  isLoading: false,
  error: null,
  filters: {
    price: 500,
    color: null,
    size: null,
    category: null,
    isPriceOpen: false,
    isColorOpen: false,
    isSizeOpen: false,
    isCategoryOpen: true,
  },
  sort: 'most-popular',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const { price, color, size, category } = action.payload

      // Update filter values if provided
      if (price !== undefined) state.filters.price = price
      if (color !== undefined) state.filters.color = color
      if (size !== undefined) state.filters.size = size
      if (category !== undefined) state.filters.category = category

      // Apply filters
      let tempProducts = [...state.products]

      // Filter by price
      if (state.filters.price) {
        tempProducts = tempProducts.filter(
          (product) => product.price <= state.filters.price
        )
      }

      // Filter by color
      if (state.filters.color) {
        tempProducts = tempProducts.filter(
          (product) => product.colors === state.filters.color
        )
      }

      // Filter by size
      if (state.filters.size) {
        tempProducts = tempProducts.filter(
          (product) => product.size === state.filters.size
        )
      }

      // Filter by category
      if (state.filters.category) {
        tempProducts = tempProducts.filter(
          (product) => product.category === state.filters.category
        )
      }

      // Apply current sort to filtered products
      state.filteredProducts = sortProductsHelper(tempProducts, state.sort)
    },

    sortProducts: (state, action) => {
      state.sort = action.payload

      // Apply sort to either filtered products (if any) or all products
      const productsToSort =
        state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products

      state.filteredProducts = sortProductsHelper(
        [...productsToSort],
        action.payload
      )
    },

    clearFilters: (state) => {
      state.filters = {
        price: 500,
        color: null,
        size: null,
        category: null,
        isPriceOpen: false,
        isColorOpen: false,
        isSizeOpen: false,
        isCategoryOpen: true,
      }
      state.filteredProducts = []
    },

    toggleFilterSection: (state, action) => {
      const { section } = action.payload
      state.filters[section] = !state.filters[section]
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        state.filteredProducts = []
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get single product
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

//  sorting products
const sortProductsHelper = (products, sortType) => {
  switch (sortType) {
    case 'lowest-price':
      return products.sort((a, b) => a.price - b.price)
    case 'highest-price':
      return products.sort((a, b) => b.price - a.price)
    case 'a-z':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case 'z-a':
      return products.sort((a, b) => b.name.localeCompare(a.name))
    case 'most-popular':
    default:
      return products.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0))
  }
}

export const {
  filterProducts,
  sortProducts,
  clearFilters,
  toggleFilterSection,
} = productsSlice.actions
export default productsSlice.reducer
