import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, selectLanguage } from '../features/language/languageSlice'

const LanguageSwitcher = () => {
  const dispatch = useDispatch()
  const currentLanguage = useSelector(selectLanguage)

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'
    dispatch(setLanguage(newLanguage))
    // The language is now saved to localStorage in the reducer
  }

  return (
    <button onClick={toggleLanguage} className="btn btn-sm btn-ghost">
      {currentLanguage === 'en' ? 'العربية' : 'English'}
    </button>
  )
}

export default LanguageSwitcher
