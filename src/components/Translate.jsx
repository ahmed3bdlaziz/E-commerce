import React from 'react'
import { useSelector } from 'react-redux'
import { selectTranslations } from '../features/language/languageSlice'

const Translate = ({ text }) => {
  const translations = useSelector(selectTranslations)

  // Return the translation if it exists, otherwise return the original text
  return translations[text] || text
}

export default Translate
