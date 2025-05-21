import { GiSettingsKnobs } from 'react-icons/gi'
import { RiArrowDropRightLine, RiArrowDropDownLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterProducts,
  toggleFilterSection,
  clearFilters,
} from '../features/products/productsSlice'
import {
  getUniqueCategories,
  getUniqueColors,
  getUniqueSizes,
} from '../utils/data'
import { selectTranslations } from '../features/language/languageSlice'

const Filters = () => {
  const dispatch = useDispatch()
  const { products, filters } = useSelector((state) => state.products)
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
  const [priceRange, setPriceRange] = useState(filters.price || maxPrice)
  const [appliedPriceRange, setAppliedPriceRange] = useState(
    filters.price || maxPrice
  )
  const [selectedColor, setSelectedColor] = useState(filters.color || 'all')
  const [selectedSize, setSelectedSize] = useState(filters.size)
  const [selectedCategory, setSelectedCategory] = useState(filters.category)

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
    const filterValues = {
      price: appliedPriceRange,
      color: selectedColor === 'all' ? null : selectedColor, // Don't filter by color if 'all' is selected
      size: selectedSize,
      category: selectedCategory,
    }

    dispatch(filterProducts(filterValues))
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
    } else {
      setSelectedCategory(category)
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
    setSelectedColor('all')
    setSelectedSize(null)
    setSelectedCategory(null)
    dispatch(clearFilters())
  }

  // Toggle filter sections using Redux
  const handleToggleSection = (section) => {
    dispatch(toggleFilterSection({ section }))
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
            <h3 className="text-lg md:text-2xl capitalize font-semibold">
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
              className="btn btn-sm btn-outline my-4 p-7 w-full max-w-full text-lg md:text-xl"
            >
              {translations.ResetFilters}
            </button>

            {/* category filter */}
            <div className="category w-full space-y-3 p-4 mt-4">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => handleToggleSection('isCategoryOpen')}
              >
                <h3 className="font-semibold text-lg md:text-2xl">
                  {translations.category}
                </h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    filters.isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  filters.isCategoryOpen
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0'
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
                      <h3 className="capitalize text-sm md:text-2xl">
                        {translations[category] || category}
                      </h3>
                      <RiArrowDropRightLine className="text-3xl" />
                    </div>
                  ))
                ) : (
                  <div className="text-lg md:text-2xl text-gray-500 py-2 w-full">
                    No categories available
                  </div>
                )}
              </div>
            </div>

            {/* price filter */}
            <div className="price w-full space-y-3 p-4">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => handleToggleSection('isPriceOpen')}
              >
                <h3 className="text-lg md:text-2xl font-semibold">
                  {translations.price}
                </h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    filters.isPriceOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  filters.isPriceOpen
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm">$0</span>
                    <span className="text-sm">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="range range-xs"
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm">Current: ${priceRange}</span>
                    <button
                      onClick={applyPriceRange}
                      className="btn btn-xs btn-outline"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* color filter */}
            <div className="color w-full space-y-3 p-4">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => handleToggleSection('isColorOpen')}
              >
                <h3 className="text-lg md:text-2xl font-semibold">
                  {translations.color}
                </h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    filters.isColorOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  filters.isColorOpen
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="flex flex-wrap gap-2 w-full">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      selectedColor === 'all'
                        ? 'border-primary'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleColorSelect('all')}
                  >
                    <span className="text-xs">All</span>
                  </div>
                  {uniqueColors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        selectedColor === color
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    >
                      {selectedColor === color && (
                        <FaCheck
                          className={`text-xs ${
                            color === 'white' ? 'text-black' : 'text-white'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* size filter */}
            <div className="size w-full space-y-3 p-4">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-base-200 rounded-lg transition-all p-2 w-full"
                onClick={() => handleToggleSection('isSizeOpen')}
              >
                <h3 className="text-lg md:text-2xl font-semibold">
                  {translations.size}
                </h3>
                <RiArrowDropDownLine
                  className={`text-3xl transition-transform duration-300 ${
                    filters.isSizeOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-full ${
                  filters.isSizeOpen
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="flex flex-wrap gap-2 w-full">
                  {uniqueSizes.map((size) => (
                    <div
                      key={size}
                      className={`px-3 text-md md:text-xl py-1 border rounded-md cursor-pointer ${
                        selectedSize === size
                          ? 'bg-primary text-white'
                          : 'bg-base-100'
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
        </div>
      </div>
    </div>
  )
}

export default Filters
