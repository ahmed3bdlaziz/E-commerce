import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { selectTranslations } from '../features/language/languageSlice'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const translations = useSelector(selectTranslations)

  return (
    <div
      className={`bg-black capitalize lg:text-lg text-center text-white h-[38px] flex justify-center items-start relative transition-all duration-600 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <span>
        {/* {translations.signIn} */}
        <Link to="/register"> {translations.signUpNow}</Link>
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80"
      >
        <IoClose className="text-xl cursor-pointer" />
      </button>
    </div>
  )
}

export default Header
