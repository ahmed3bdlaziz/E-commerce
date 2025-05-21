import React from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'

const ProductsGrid = ({ products, TopSelling }) => {
  const { isLoading } = useSelector((state) => state.products)

  // If loading, show skeleton products
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Product key={`skeleton-${index}`} isLoading={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <Product key={product.id} product={product} TopSelling={TopSelling} />
      ))}
    </div>
  )
}

export default ProductsGrid
