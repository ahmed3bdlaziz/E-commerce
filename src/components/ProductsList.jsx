import { Products } from '../utils/data'
import Product from './Product'

const ProductsList = () => {
  return (
    <div className="grid grid-cols-2 p-2 md:p-0 lg:grid-cols-3 gap-6 cursor-pointer">
      {Products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductsList
