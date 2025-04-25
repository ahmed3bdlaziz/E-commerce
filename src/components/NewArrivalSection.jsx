import { Link } from 'react-router-dom'
import Title from './Title'
import { Products } from '../utils/data'
import Product from './Product'

const NewArrivalSection = () => {
  return (
    <section className="py-12 px-4">
      <Title title="New Arrivals" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {Products.slice(0, 4).map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="newarrival"
            className="border-2 rounded-3xl cursor-pointer w-32 h-10 block mx-auto text-center py-2 text-center hover:dark:text-black hover:bg-white hover:border-black hover:text-white transition-all duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalSection
