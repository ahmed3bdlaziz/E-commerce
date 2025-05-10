import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import {
  removeFromCart,
  clearCart,
  updateCartItemAmount,
} from '../features/cart/cartSlice'
import Breadcrumbs from '../components/Breadcrumbs'
import { selectTranslations } from '../features/language/languageSlice'

const Cart = () => {
  const { currentUser: user } = useSelector((state) => state.user)
  // console.log(useSelector((state) => state.user.isAuthenticated))
  const { cartItems, numItemsInCart, cartTotal, shipping, tax, orderTotal } =
    useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const translations = useSelector(selectTranslations)

  // Function to handle login to checkout
  const handleLoginToCheckout = () => {
    // Store checkout intent in localStorage
    localStorage.setItem('checkoutAfterLogin', 'true')
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs title={translations.cartTitle} />
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">{translations.cartEmpty}</h2>
          <p className="mb-8">{translations.cartEmptySubtitle}.</p>
          <Link to="/products" className="btn btn-neutral cursor-pointer">
            {translations.cartEmptyBtn}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs title={translations.cartTitle} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Cart Items */}
        <div className="bg-base-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            {translations.shoppingCart}
          </h2>

          {/* Cart Items List */}
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="py-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="capitalize">Color: {item.color}</span>
                    {item.size && (
                      <span className="ml-2">Size: {item.size}</span>
                    )}
                  </div>
                  <div className="text-primary font-medium mt-1">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() => {
                        if (item.amount === 1) {
                          dispatch(
                            removeFromCart({
                              id: item.id,
                              color: item.color,
                              size: item.size,
                            })
                          )
                          return
                        }
                        dispatch(
                          updateCartItemAmount({
                            id: item.id,
                            color: item.color,
                            size: item.size,
                            amount: item.amount - 1,
                          })
                        )
                      }}
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="mx-2 w-8 text-center">{item.amount}</span>
                    <button
                      className="btn btn-sm btn-circle"
                      onClick={() => {
                        dispatch(
                          updateCartItemAmount({
                            id: item.id,
                            color: item.color,
                            size: item.size,
                            amount: item.amount + 1,
                          })
                        )
                      }}
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="btn btn-sm btn-circle self-start"
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item.id,
                        color: item.color,
                        size: item.size,
                      })
                    )
                  }
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Actions */}
          <div className="flex justify-between mt-6">
            <Link to="/products" className="btn btn-outline">
              {translations.cartEmptyBtn}
            </Link>
            <button
              className="btn btn-error"
              onClick={() => dispatch(clearCart())}
            >
              {translations.cleartBtn}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-base-100 p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">
            {translations.orderSummary}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>
                {translations.subTotal} ({numItemsInCart} )
              </span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{translations.shipping}</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{translations.tax}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 font-bold flex justify-between">
              <span>{translations.orderTotal}</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {user ? (
            <Link
              to="/checkout"
              className="btn btn-neutral cursor-pointer w-full mt-6"
            >
              {translations.ProceedToCheckout}
            </Link>
          ) : (
            <div className="mt-6">
              <Link
                to="/login"
                className="btn btn-neutral cursor-pointer w-full"
                onClick={handleLoginToCheckout}
              >
                {translations.LoginToCheckout}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
