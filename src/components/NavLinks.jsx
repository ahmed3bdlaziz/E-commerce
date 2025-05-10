import { NavLink } from 'react-router-dom'
import { links } from '../utils/data'
import { selectTranslations } from '../features/language/languageSlice'
import { useSelector } from 'react-redux'

const NavLinks = () => {
  const translations = useSelector(selectTranslations)
  const { currentUser } = useSelector((state) => state.user)

  // Filter links to remove orders link for non-admin users
  const filteredLinks = links.filter((link) => {
    // If the link is not "orders", always show it
    if (link.text !== 'orders') return true

    // If the link is "orders", only show it for admin users
    return currentUser && currentUser.role === 'admin'
  })

  return (
    <>
      {filteredLinks.map((link) => {
        const { id, url, text } = link

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize text-md lg:text-xl">
              {translations[text] || text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}

export default NavLinks
