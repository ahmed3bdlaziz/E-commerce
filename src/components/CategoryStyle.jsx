import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectTranslations } from '../features/language/languageSlice'

const CategoryStyle = () => {
  const { products } = useSelector((state) => state.products)
  const [categories, setCategories] = useState([])
  const translations = useSelector(selectTranslations)

  useEffect(() => {
    if (products && products.length > 0) {
      // Extract unique categories from products
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ]

      // Take only the first 4 categories (or all if less than 4)
      const limitedCategories = uniqueCategories.slice(0, 4)

      // Create category objects with placeholder images
      const categoryObjects = limitedCategories.map((category) => ({
        name: category,
        // You can replace these with actual category images if available
        image: `/src/assets/images/styles/${category.toLowerCase()}.png`,
        link: `/category/${category.toLowerCase()}`,
      }))
      setCategories(categoryObjects)
    }
  }, [products])

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">
          {translations.categoryTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="aspect-[4/3] sm:aspect-[3/2] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback image if category image doesn't exist
                    e.target.src = '/src/assets/images/styles/casual.png'
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-black bg-white/90 px-6 py-2 rounded-full shadow-sm">
                    {category.name === 't-shirts'
                      ? 'tShirts'
                      : translations[category.name] || category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryStyle
