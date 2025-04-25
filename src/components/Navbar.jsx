import { FaRegUserCircle } from 'react-icons/fa'
import NavLinks from './NavLinks'
import { FaOpencart } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const themes = {
    dark: 'dark',
    winter: 'winter',
  }

  const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem('theme') || themes.winter
    return theme
  }

  const [theme, setTheme] = useState(getThemeFromLocalStorage())
  const handleTheme = () => {
    const newTheme = theme === themes.dark ? themes.winter : themes.dark
    localStorage.setItem('theme', newTheme)

    setTheme(newTheme)
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <div className="w-full flex justify-center bg-base-100">
        <div className="navbar not-dark:bg-base-100 not-dark:shadow-sm max-w-7xl w-full px-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
              >
                {/* Add search input to mobile menu */}
                <li className="mb-2">
                  <div className="form-control w-full px-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="input input-bordered w-full"
                    />
                  </div>
                </li>
                <NavLinks />
                <div className="btn-container w-full flex flex-row justify-evenly gap-2">
                  <Link to="/cart">
                    <FaOpencart className="text-lg" />
                  </Link>
                  <Link to="/login">
                    <FaRegUserCircle className="text-lg" />
                  </Link>
                </div>
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost uppercase font-extrabold text-3xl not-dark:text-black"
            >
              shopify.co
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <NavLinks />
            </ul>
          </div>
          <div className="navbar-end flex gap-3">
            <button
              className="cursor-pointer bg-transparent border-0 outline-0 text-2xl"
              onClick={handleTheme}
            >
              {theme === themes.winter ? <BsFillSunFill /> : <BsFillMoonFill />}
            </button>
            {/* Hide search on small screens, show on medium and up */}
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto hidden md:block"
            />
            <div className="btn-container hidden md:flex gap-2">
              <Link to="/cart">
                <FaOpencart className="text-2xl" />
              </Link>
              <Link to="/login">
                <FaRegUserCircle className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
