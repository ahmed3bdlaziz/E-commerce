import { IoHomeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ title }) => {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">
            <IoHomeOutline />
            Home
          </Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2">{title}</span>
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
