import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navbar, Footer } from '../components'
import { useSelector } from 'react-redux'
import {
  selectDirection,
  selectLanguage,
  selectTheme,
} from '../features/language/languageSlice'

const HomeLayout = () => {
  const direction = useSelector(selectDirection)
  const language = useSelector(selectLanguage)
  const theme = useSelector(selectTheme)

  useEffect(() => {
    // Apply direction to document
    document.documentElement.dir = direction
    // Update lang attribute
    document.documentElement.lang = language
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme)
    // Add RTL class to body if needed
    if (direction === 'rtl') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [direction, language, theme])

  return (
    <>
      <Header />
      <Navbar />
      <div
        className={`min-h-screen ${direction === 'rtl' ? 'rtl-layout' : ''}`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default HomeLayout
