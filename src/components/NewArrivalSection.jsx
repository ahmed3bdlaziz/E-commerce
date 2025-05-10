import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from './Title'
import Product from './Product'
import { getProducts } from '../features/products/productsSlice'
import { selectTranslations } from '../features/language/languageSlice'
import Loading from './Loading'

const NewArrivalSection = () => {
  const dispatch = useDispatch()
  const { products, isLoading } = useSelector((state) => state.products)
  const translations = useSelector(selectTranslations)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  // Sort products by creation date (newest first)
  const newArrivals = products
    ? [...products]
        .filter((product) => product.new_arrival)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
    : []

  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <Title title={translations.newArrival} />
        <div className="max-w-6xl mx-auto">
          <Loading />
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <Title title={translations.newArrival} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {newArrivals.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="border-2 rounded-3xl cursor-pointer w-32 h-10 block mx-auto text-center py-2  hover:dark:text-black hover:bg-white hover:border-black hover:text-white transition-all duration-300"
          >
            {translations.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalSection
