import { Link } from 'react-router-dom'
import {
  calculateDiscountPercentage,
  formatPrice,
  renderStars,
} from '../utils/data'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Product = ({ product, TopSelling }) => {
  const { isLoading } = useSelector((state) => state.products)
  const [showSkeleton, setShowSkeleton] = useState(true)

  const domain = `http://localhost:1337`

  useEffect(() => {
    // Set a timer to hide skeleton after 100ms
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 1000)

    // Clean up timer on unmount
    return () => clearTimeout(timer)
  }, [])

  // Show skeleton if loading or during initial 100ms
  if (isLoading || showSkeleton) {
    return (
      <div className="border-1 shadow-xl border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="aspect-w-1 aspect-h-1 mb-4 relative overflow-hidden rounded-lg bg-gray-200 h-48"></div>
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/products/${product.documentId}`}
      key={product.id}
      className=" border-1 shadow-xl border-gray-200  rounded-lg p-4 group cursor-pointer"
    >
      <div className="aspect-w-1 aspect-h-1 mb-4 relative overflow-hidden rounded-lg">
        <img
          src={domain + product.image.url}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {TopSelling && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
            {product.sold_count} sold
          </span>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="text-yellow-400 text-sm">
          {renderStars(product.rate)}
          <span className="text-gray-500 ml-1">({product.rate})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold ">
            {formatPrice(
              product.price_after_disc
                ? product.price_after_disc
                : product.price
            )}
          </span>
          {product.price_after_disc && (
            <>
              <span className="text-gray-500 line-through">
                {/* ${product.price} */}
                {formatPrice(product.price)}
              </span>
              <span className="text-red-500 text-sm">
                -
                {calculateDiscountPercentage(
                  product.price,
                  product.price_after_disc
                )}
                %
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Product
