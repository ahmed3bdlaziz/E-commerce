import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'

const Header = () => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div
      className={`bg-black capitalize lg:text-lg text-center text-white h-[38px] flex justify-center items-start relative transition-all duration-600 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <span>
        sign in and get 20% off to your first order.
        <Link to="/register"> Sign Up Now</Link>
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
