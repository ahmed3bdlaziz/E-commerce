import { GiSettingsKnobs } from 'react-icons/gi'
import { RiArrowDropRightLine, RiArrowDropDownLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { filterProducts } from '../features/products/productsSlice'
import {
  getUniqueCategories,
  getUniqueColors,
  getUniqueSizes,
} from '../utils/data'
import { selectTranslations } from '../features/language/languageSlice'

const Filters = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)
  const translations = useSelector(selectTranslations)

  // Calculate the maximum price from products
  const maxPrice =
    products.length > 0
      ? Math.ceil(
          Math.max(
            ...products.map((product) =>
              product.price_after_disc
                ? product.price_after_disc
                : product.price
            )
          )
        )
      : 1000 // Fallback value if no products

  const [isChecked, setIsChecked] = useState(false)
  const [priceRange, setPriceRange] = useState(maxPrice)
  const [appliedPriceRange, setAppliedPriceRange] = useState(maxPrice)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('all')
  const [isSizeOpen, setIsSizeOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)

  // Get unique categories, colors, and sizes using the imported functions
  const categories = getUniqueCategories(products)
  const uniqueColors = getUniqueColors(products)
  const uniqueSizes = getUniqueSizes(products)

  useEffect(() => {
    const handleResize = () => {
      setIsChecked(window.innerWidth >= 768)
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Apply filters when filter values change
  useEffect(() => {
    const filters = {
      price: appliedPriceRange,
      color: selectedColor === 'all' ? null : selectedColor, // Don't filter by color if 'all' is selected
      size: selectedSize,
      category: selectedCategory,
    }

    dispatch(filterProducts(filters))
  }, [
    dispatch,
    appliedPriceRange,
    selectedColor,
    selectedSize,
    selectedCategory,
  ])

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      dispatch(filterProducts({ category: null }))
    } else {
      setSelectedCategory(category)
      dispatch(filterProducts({ category }))
    }
  }

  // Handle color selection
  const handleColorSelect = (colorName) => {
    // If the same color is clicked again, set to 'all'
    if (selectedColor === colorName) {
      setSelectedColor('all')
    } else {
      setSelectedColor(colorName)
    }
  }

  // Handle size selection
  const handleSizeSelect = (size) => {
    // If the same size is clicked again, deselect it
    if (selectedSize === size) {
      setSelectedSize(null)
    } else {
      setSelectedSize(size)
    }
  }

  // Handle price range change
  const handlePriceChange = (e) => {
    setPriceRange(e.target.value)
  }

  // Apply price range filter
  const applyPriceRange = () => {
    setAppliedPriceRange(priceRange)
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceRange(maxPrice)
    setAppliedPriceRange(maxPrice)
    setSelectedColor('all') // Changed from null to 'all'
    setSelectedSize(null)
    setSelectedCategory(null)
    dispatch(filterProducts({}))
  }

  return (
    <div className="join join-vertical bg-base-100 w-full h-auto">
      <div className="collapse border-gray-300 border-1 rounded-lg">
        <input
          type="checkbox"
          className="peer"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <div className="collapse-title text-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl capitalize font-semibold">
              {translations.filter}
            </h3>
            <GiSettingsKnobs
              className={`transition-transform duration-300 ${
                isChecked ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
        <div className="collapse-content transition-all duration-300 ease-in-out">
          <hr className="text-gray-400" />
          <div className="flex flex-col items-center justify-between cursor-pointer w-full">
            {/* Reset filters button */}
            <button
              onClick={resetFilters}
              className="btn btn-sm btn-outline my-2 w-full max-w-full"
            >
              {translations.ResetFilters}
            </button>

            {/* category filter */}
            <div className="category w-full space-y-3 p-4 mt-4">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <h3 className="text-lg font-semibold">
                  {translations.category}
                </h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  isCategoryOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category}
                      className={`flex justify-between items-center hover:bg-base-200 rounded-lg transition-all p-2 w-full ${
                        selectedCategory === category ? 'bg-base-200' : ''
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <h3 className="capitalize">{category}</h3>
                      <RiArrowDropRightLine className="text-3xl" />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-2 w-full">
                    No categories available
                  </div>
                )}
              </div>
              <hr className="my-4 border-gray-200 w-full" />

              {/* Price range filter */}
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <h3 className="text-lg font-semibold">{translations.price}</h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    isPriceOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  isPriceOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="range"
                    min={0}
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="range range-primary w-full"
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm">$0</span>
                    <span className="text-sm font-medium">
                      Selected: ${priceRange}
                    </span>
                    <span className="text-sm">${maxPrice}</span>
                  </div>
                  <button
                    onClick={applyPriceRange}
                    className="btn btn-sm btn-primary w-full"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <hr className="my-4 border-gray-200 w-full" />

              {/* color filter */}
              <div className="color w-full space-y-3 ">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                  onClick={() => setIsColorOpen(!isColorOpen)}
                >
                  <h3 className="text-lg font-semibold">
                    {translations.color}
                  </h3>
                  <RiArrowDropDownLine
                    className={`text-3xl transition-transform duration-300 ${
                      isColorOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out w-full ${
                    isColorOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="flex flex-wrap gap-2 mt-2 w-full">
                    {/* Add "All Colors" option */}
                    <div
                      key="all"
                      className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border border-gray-300 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 ${
                        selectedColor === 'all'
                          ? 'ring-2 ring-offset-2 ring-black'
                          : ''
                      }`}
                      onClick={() => setSelectedColor('all')}
                      title="All Colors"
                    >
                      {selectedColor === 'all' && (
                        <FaCheck className="text-sm text-white" />
                      )}
                    </div>
                    {uniqueColors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                          selectedColor === color
                            ? 'ring-2 ring-offset-2 ring-black'
                            : ''
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                        title={color}
                      >
                        {selectedColor === color && (
                          <FaCheck
                            className={`text-sm ${
                              ['white', 'yellow', 'lime'].includes(color)
                                ? 'text-black'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-200 w-full" />

              {/* size filter */}
              <div className="size w-full space-y-3">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                >
                  <h3 className="text-lg font-semibold">{translations.size}</h3>
                  <RiArrowDropDownLine
                    className={`text-3xl transition-transform duration-300 ${
                      isSizeOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out w-full ${
                    isSizeOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {uniqueSizes.map((size) => (
                      <div
                        key={size}
                        className={`flex justify-center items-center p-2 border rounded-md cursor-pointer transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white'
                            : 'hover:bg-base-200'
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 h-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
