import React from 'react'
import { useSelector } from 'react-redux'
import { selectTranslations } from '../features/language/languageSlice'

const NoProducts = () => {
  const translations = useSelector(selectTranslations)

  return <div className="text-center py-10">{translations.noProducts}</div>
}

export default NoProducts
