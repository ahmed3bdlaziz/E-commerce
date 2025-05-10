import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import { useParams } from 'react-router-dom'

const ProductsList = ({ category, TopSelling }) => {
  const { id } = useParams()
  const { products } = useSelector((state) => state.products)

  // Filter products by category ID if category prop is true
  const displayProducts = category
    ? products.filter(
        (product) => product.category.toLowerCase() === id.toLowerCase()
      )
    : products

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium">
          No products found in this category
        </h3>
        <p className="text-gray-500 mt-2">
          Try another category or check back later
        </p>
      </div>
    )
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
