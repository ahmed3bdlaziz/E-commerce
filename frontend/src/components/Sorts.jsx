import { useDispatch, useSelector } from 'react-redux'
import { sortProducts } from '../features/products/productsSlice'
import { selectTranslations } from '../features/language/languageSlice'

const Sorts = () => {
  const dispatch = useDispatch()
  const { products, filteredProducts } = useSelector((state) => state.products)
  const translations = useSelector(selectTranslations)
  // Use the appropriate count based on whether we're showing filtered products
  const count =
    filteredProducts.length > 0 ? filteredProducts.length : products.length

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value))
  }

  return (
    <div className="flex items-center justify-between mb-3 ">
      <h4 className="text-sm md:text-lg w-full mx-2 md:mx-0  ">
        {translations.Showing} 1-{Math.min(10, count)} of ({count}
        {translations.results})
      </h4>
      <div className="flex items-center gap-2 w-full justify-end">
        <label>Sort:</label>
        <select
          className="select select-bordered w-full max-w-[200px] border-0 border-b-1"
          onChange={handleSort}
        >
          <option value="most-popular">Most Popular</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  )
}

export default Sorts
