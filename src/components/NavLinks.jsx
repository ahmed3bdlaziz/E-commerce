import { NavLink } from 'react-router-dom'
import { links } from '../utils/data'

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link
        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}

export default NavLinks
