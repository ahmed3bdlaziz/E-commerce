import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import { useParams } from 'react-router-dom'
import NoProducts from './NoProducts'

const ProductsList = ({ category, TopSelling }) => {
  const { id } = useParams()
  const { products, filteredProducts } = useSelector((state) => state.products)

  // Determine which products to display
  let displayProducts = []

  if (category) {
    // If category prop is true, filter by category ID
    displayProducts = products.filter(
      (product) => product.category.toLowerCase() === id.toLowerCase()
    )
  } else if (filteredProducts.length > 0) {
    // If there are filtered products, use those
    displayProducts = filteredProducts
  } else {
    // Otherwise use all products
    displayProducts = products
  }

  if (displayProducts.length === 0) {
    return <NoProducts />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <Product key={product.id} product={product} TopSelling={TopSelling} />
      ))}
    </div>
  )
}

export default ProductsList
