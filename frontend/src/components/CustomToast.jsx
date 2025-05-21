import { FaShoppingCart, FaTrash, FaInfoCircle } from 'react-icons/fa'

export const CustomToast = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaShoppingCart className="text-xl" />
      case 'error':
        return <FaTrash className="text-xl" />
      default:
        return <FaInfoCircle className="text-xl" />
    }
  }

  return (
    <div className="flex items-center gap-3">
      {getIcon()}
      <p>{message}</p>
    </div>
  )
}
