import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from '../components/Breadcrumbs'
import Filters from '../components/Filters'
import Sorts from '../components/Sorts'
import ProductsList from '../components/ProductsList'
import { getProducts } from '../features/products/productsSlice'
import Loading from '../components/Loading'
import { selectTranslations } from '../features/language/languageSlice'

const Products = () => {
  const dispatch = useDispatch()
  const translations = useSelector(selectTranslations)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="max-w-7xl mx-auto h-auto">
      <hr />
      <Breadcrumbs title={translations.products} />
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-7 ">
        {/* filters */}
        <Filters />
        <div className="products w-full ">
          {/* sort  */}
          <Sorts />
          {/* products */}
          <ProductsList />
          {/* pagination */}
          <div className="mx-auto py-5 w-full flex justify-center items-center">
            <div className="join">
              <button className="join-item btn">1</button>
              <button className="join-item btn">2</button>
              <button className="join-item btn btn-disabled">...</button>
              <button className="join-item btn">99</button>
              <button className="join-item btn">100</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
