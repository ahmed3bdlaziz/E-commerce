import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, selectTheme } from '../features/language/languageSlice'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeSwitcher = () => {
  const dispatch = useDispatch()
  const currentTheme = useSelector(selectTheme)

  const toggleTheme = () => {
    const newTheme = currentTheme === 'winter' ? 'dark' : 'winter'
    dispatch(setTheme(newTheme))
  }

  return (
    <button
      className="cursor-pointer bg-transparent border-0 outline-0 text-2xl"
      onClick={toggleTheme}
    >
      {/* <button onClick={toggleTheme} className="btn btn-sm btn-ghost"> */}
      {currentTheme === 'winter' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeSwitcher
//  <button
//               className="cursor-pointer bg-transparent border-0 outline-0 text-2xl"
//               onClick={handleTheme}
//             >
//               {/* {theme === themes.winter ? <BsFillSunFill /> : <BsFillMoonFill />} */}
//               <ThemeSwitcher />
//             </button>
