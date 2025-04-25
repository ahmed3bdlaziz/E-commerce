import { Link } from 'react-router-dom'
import Title from './Title'
import Product from './Product'
import { Products } from '../utils/data'

const TopSellingSection = () => {
  return (
    <section className="py-12 px-4">
      <Title title="TOP SELLING" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Products.slice(0, 4).map((product) => (
            <Product key={product.id} product={product} TopSelling={true} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="products"
            className="border-2 rounded-3xl cursor-pointer w-32 h-10 block mx-auto text-center py-2 text-center hover:dark:text-black hover:bg-white hover:border-black hover:text-white transition-all duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopSellingSection
