import { Link } from 'react-router-dom'

const Product = ({ product, TopSelling }) => {
  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }
  return (
    // <Link
    //   to={`/products/${product.id}`}
    //   key={product.id}
    //   className="bg-gray-100 rounded-lg p-4 group"
    // >
    //   <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <h3 className="font-medium text-lg">{product.name}</h3>
    //     <div className="text-yellow-400 text-sm">
    //       {renderStars(product.rating)}
    //       <span className="text-gray-500 ml-1">{product.rating}</span>
    //     </div>
    //     <div className="flex items-center gap-2">
    //       <span className="font-bold text-black">${product.price}</span>
    //       {product.oldPrice && (
    //         <>
    //           <span className="text-gray-500 line-through">
    //             ${product.oldPrice}
    //           </span>
    //           <span className="text-red-500 text-sm">-{product.discount}</span>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </Link>
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="bg-gray-100 rounded-lg p-4 group cursor-pointer"
    >
      <div className="aspect-w-1 aspect-h-1 mb-4 relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {TopSelling && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
            {product.soldCount} sold
          </span>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="text-yellow-400 text-sm">
          {renderStars(product.rating)}
          <span className="text-gray-500 ml-1">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-black">${product.price}</span>
          {product.oldPrice && (
            <>
              <span className="text-gray-500 line-through">
                ${product.oldPrice}
              </span>
              <span className="text-red-500 text-sm">-{product.discount}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Product
