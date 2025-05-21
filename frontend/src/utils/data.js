import axios from 'axios'

// import P1 from '../assets/productImg/p1.png'
// import P2 from '../assets/productImg/p2.png'
// import P3 from '../assets/productImg/p3.png'
// import P4 from '../assets/productImg/p4.png'
// import P5 from '../assets/productImg/p5.png'
// import P6 from '../assets/productImg/p6.png'
// import P7 from '../assets/productImg/p7.png'
// import P8 from '../assets/productImg/p8.png'

export const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: '/about', text: 'about' },
  { id: 3, url: '/products', text: 'products' },
  { id: 4, url: '/orders', text: 'orders' },
]
// export const Products = [
//   {
//     id: 1,
//     name: 'Classic Black T-shirt',
//     price: 89.99,
//     rating: 4.8,
//     image: P5,
//     colors: ['olive', 'darkGreen', 'navy'],
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     soldCount: '1.2k',
//   },
//   {
//     id: 2,
//     name: 'Premium Denim Jeans',
//     price: 199.99,
//     oldPrice: 249.99,
//     discount: '20%',
//     rating: 4.7,
//     image: P6,
//     colors: ['olive', 'darkGreen', 'navy'],
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     soldCount: '950',
//   },
//   {
//     id: 3,
//     name: 'Casual Plaid Shirt',
//     price: 129.99,
//     rating: 4.6,
//     image: P7,
//     colors: ['olive', 'darkGreen', 'navy'],
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     soldCount: '800',
//   },

//   {
//     id: 4,
//     name: 'Sport Raglan Tee',
//     price: 79.99,
//     oldPrice: 99.99,
//     discount: '20%',
//     rating: 4.9,
//     image: P8,
//     colors: ['olive', 'darkGreen', 'navy'],
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     soldCount: '1.5k',
//   },
//   {
//     id: 5,
//     name: 'black pants',
//     price: 100.0,
//     oldPrice: 105.22,
//     discount: '20%',
//     rating: 4.9,
//     image: P8,
//     colors: ['olive', 'darkGreen', 'navy'],
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     soldCount: '1.5k',
//   },
// ]
const baseUrl = 'http://localhost:1337'
export const customFetch = axios.create({
  baseURL: baseUrl,
})
// format price
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount.toFixed(2))
}

export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  return (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(0)
}

export const renderStars = (rating) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
}
// ============
// single product
// ============

// Get unique categories from products
export const getUniqueCategories = (products) => {
  return [
    ...new Set(
      products.map((product) => product.category).filter(Boolean) // Remove undefined/null values
    ),
  ]
}

// Get unique colors from products
export const getUniqueColors = (products) => {
  return [...new Set(products.map((product) => product.colors))].filter(Boolean)
}

// Get unique sizes from products
export const getUniqueSizes = (products) => {
  return [...new Set(products.map((product) => product.size))].filter(Boolean)
}
// ============
// Checkout Page
// ============

// ============
// Orders Page
// ============
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Paid':
      return 'badge-success'
    case 'Pending':
      return 'badge-warning'
    case 'Failed':
      return 'badge-error'
    default:
      return 'badge-ghost'
  }
}
