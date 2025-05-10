import { IoHomeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTranslations } from '../features/language/languageSlice'

const Breadcrumbs = ({ title, singleProduct }) => {
  const translations = useSelector(selectTranslations)

  return (
    <div className="breadcrumbs text-sm my-5">
      <ul>
        <li>
          <Link to="/">
            <IoHomeOutline />
            {translations.home}
          </Link>
        </li>
        {singleProduct && (
          <li>
            <Link to="/products">{translations.products}</Link>
          </li>
        )}
        <li>
          <span className="inline-flex items-center gap-2">{title}</span>
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
