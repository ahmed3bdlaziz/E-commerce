import { useState, useEffect } from 'react'
import { Breadcrumbs, Loading } from '../components'
import {
  calculateDiscountPercentage,
  formatPrice,
  renderStars,
} from '../utils/data'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

const SingleProduct = () => {
  const translations = useSelector((state) => state.language.translations)
  const domain = `http://localhost:1337`
  const { id } = useParams()
  const dispatch = useDispatch()
  const { singleProduct: product, isLoading } = useSelector(
    (state) => state.products
  )
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.documentId || product.id,
        color: product.colors,
        size: product.size,
        amount: quantity,
        product: {
          id: product.documentId || product.id,
          name: product.name,
          price: product.price_after_disc || product.price,
          image: `${domain}${product.image.url}`,
        },
      })
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl flex items-center justify-center mx-auto px-4 py-8">
        <Loading />
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const description = product?.description?.[0]?.children?.[0]?.text || ''
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs singleProduct={true} title={product.name} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8">
        <div className="flex items-center justify-center">
          <img
            src={`${domain}${product.image.url}`}
            alt={product.name}
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className=" text-md md:text-2xl font-bold uppercase">
            {product.name}
          </h1>

          <div className="text-yellow-400 text-xl">
            {renderStars(product.rate)}
            <span className="text-gray-500 ml-1">({product.rate})</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-md md:text-2xl font-bold">
              {formatPrice(
                product.price_after_disc
                  ? product.price_after_disc
                  : product.price
              )}
            </span>
            <span className="text-md md:text-2xl text-gray-400 line-through">
              {product.price_after_disc ? formatPrice(product.price) : ''}
            </span>
            {product.price_after_disc && (
              <span className="bg-red-100 text-red-500 px-2 py-1 rounded">
                {calculateDiscountPercentage(
                  product.price,
                  product.price_after_disc
                )}
                %
              </span>
            )}
          </div>

          <p className="text-gray-600">{description}</p>

          <div className="flex flex-col gap-4">
            <h3 className="text-md md:text-2xl">{translations.SelectColor}</h3>
            <div className="flex gap-3">
              <p
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: `${product.colors}` }}
              ></p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-md md:text-2xl">{translations.SelectSize}</h3>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full">{product.size}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {product.stock > 0 ? (
              <div className="flex items-center rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-xl font-bold hover:text-gray-600 cursor-pointer"
                >
                  −
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-4 py-2 text-xl font-bold hover:text-gray-600 cursor-pointer"
                >
                  +
                </button>
              </div>
            ) : (
              <div className="text-red-500">Out of Stock</div>
            )}
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="flex-1 text-center bg-black text-white py-3 cursor-pointer rounded-full hover:bg-gray-800 transition-colors"
              >
                {translations.addToCart}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
