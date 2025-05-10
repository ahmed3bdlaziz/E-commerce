import { FaRegUserCircle } from 'react-icons/fa'
import NavLinks from './NavLinks'
import { FaBarsStaggered, FaOpencart } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon'
import { IoIosLogOut } from 'react-icons/io'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  // Function to get user from localStorage
  const getUserFromStorage = () => {
    const userFromStorage = localStorage.getItem('user')
    if (userFromStorage) {
      return JSON.parse(userFromStorage)
    }
    return null
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
  }

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
                <FaBarsStaggered />
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
                <div className="btn-container w-full flex flex-row justify-evenly items-center gap-2">
                  <Link to="/cart">
                    <FaOpencart className="text-lg" />
                  </Link>
                  {currentUser ? (
                    <button onClick={handleLogout}>
                      <IoIosLogOut className="text-lg" />
                    </button>
                  ) : (
                    <Link to="/login">
                      <FaRegUserCircle className="text-lg" />
                    </Link>
                  )}
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
            <ThemeSwitcher />
            {/* Hide search on small screens, show on medium and up */}
            <LanguageSwitcher className="hidden md:block" />
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto hidden md:block"
            />
            <div className="btn-container hidden md:flex gap-2 justify-center items-center">
              <CartIcon />
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-circle"
                >
                  <IoIosLogOut className="text-3xl" />
                </button>
              ) : (
                <Link to="/login">
                  <FaRegUserCircle className="text-2xl" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
