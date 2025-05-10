import { FaOpencart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartIcon = () => {
  const { numItemsInCart, cartTotal } = useSelector((state) => state.cart)
  // console.log(typeof numItemsInCart)
  return (
    <div className="relative">
      <Link to="/cart" className="flex items-center">
        <FaOpencart className="text-2xl" />
        {numItemsInCart > 0 && (
          <div className="absolute -top-2 -right-2 bg-neutral text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {numItemsInCart}
          </div>
        )}
      </Link>
      {numItemsInCart > 0 && (
        <div className="absolute top-6 -right-2 bg-base-100 text-neutral border border-primary rounded-md px-2 py-1 text-xs whitespace-nowrap shadow-md">
          ${cartTotal.toFixed(2)}
        </div>
      )}
    </div>
  )
}

export default CartIcon
