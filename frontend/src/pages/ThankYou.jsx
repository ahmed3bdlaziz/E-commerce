import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa'
import { selectTranslations } from '../features/language/languageSlice'

const ThankYou = () => {
  const translations = useSelector(selectTranslations)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  // Redirect if not coming from checkout
  useEffect(() => {
    const fromCheckout = sessionStorage.getItem('checkout_completed')
    if (!fromCheckout) {
      navigate('/')
    }

    // Auto-redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/')
    }, 5000)

    // Clear checkout flag and timer when component unmounts
    return () => {
      sessionStorage.removeItem('checkout_completed')
      clearTimeout(redirectTimer)
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl overflow-hidden">
        <div className="card-body p-0">
          {/* Success Header */}
          <div className="bg-neutral text-primary-content p-8 text-center">
            <div className="animate-bounce">
              <FaCheckCircle className="text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                {translations.thankYou || 'Thank You!'}
              </h1>
              <p className="text-lg opacity-90">
                {translations.orderConfirmed || 'Your order has been confirmed'}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {translations.orderDetails || 'Order Details'}
              </h2>

              <div className="bg-base-200 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-base-content/70">
                    {translations.orderNumber || 'Order Number'}:
                  </span>
                  <span className="font-medium">
                    #ORD-{Math.floor(Math.random() * 10000)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-base-content/70">
                    {translations.date || 'Date'}:
                  </span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">
                    {translations.email || 'Email'}:
                  </span>
                  <span className="font-medium">
                    {user?.email || 'guest@example.com'}
                  </span>
                </div>
              </div>

              <p className="text-base-content/80 mb-6">
                {translations.orderConfirmationMessage ||
                  "We've sent a confirmation email with your order details and tracking information. You'll receive updates as your order is processed."}
              </p>

              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  You will be redirected to the home page in 5 seconds...
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/" className="btn btn-outline flex-1 gap-2">
                  <FaHome />
                  {translations.backToHome || 'Back to Home'}
                </Link>
                <Link to="/orders" className="btn btn-primary flex-1 gap-2">
                  <FaShoppingBag />
                  {translations.viewOrders || 'View Orders'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
