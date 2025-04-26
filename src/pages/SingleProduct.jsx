import { useParams } from 'react-router-dom'
import { Products } from '../utils/data'

const SingleProduct = () => {
  const { id } = useParams()

  const product = Products.find((product) => product.id === parseInt(id))

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <div className="text-yellow-400 text-lg">
            {'★'.repeat(Math.floor(product.rating)) +
              '☆'.repeat(5 - Math.floor(product.rating))}
            <span className="text-gray-500 ml-2">{product.rating}</span>
          </div>
          <div className="flex items-center gap-4 text-xl">
            <span className="font-bold text-black">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
                <span className="text-red-500">-{product.discount}</span>
              </>
            )}
          </div>
          {product.soldCount && (
            <p className="text-green-600">{product.soldCount} sold</p>
          )}
          <button className="btn btn-neutral w-full md:w-auto px-8 rounded-3xl">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
