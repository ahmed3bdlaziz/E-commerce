import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProducts, filterProducts } from '../features/products/productsSlice'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsList from '../components/ProductsList'
import Sorts from '../components/Sorts'

const Category = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    // First, ensure we have all products loaded
    dispatch(getProducts())

    // Then filter by the category from the URL
    dispatch(filterProducts({ category: id }))
  }, [dispatch, id])

  return (
    <div className="max-w-7xl mx-auto h-auto px-4 py-8">
      <Breadcrumbs title={`${id} Collection`} />
      <div className="w-full">
        <Sorts />
        <ProductsList category={true} />
      </div>
    </div>
  )
}

export default Category
