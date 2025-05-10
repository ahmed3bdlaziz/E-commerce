import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { clearCart } from '../features/cart/cartSlice'
import { addOrder } from '../features/orders/ordersSlice'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems, orderTotal } = useSelector((state) => state.cart)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  })

  const [address, setAddress] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const [errors, setErrors] = useState({})

  // Set amount from cart when component mounts
  useEffect(() => {
    setCardDetails((prev) => ({
      ...prev,
      amount: orderTotal.toFixed(2),
    }))
  }, [orderTotal])

  // Handle input changes for card details
  const handleChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces after every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim()

      setCardDetails({
        ...cardDetails,
        [name]: formattedValue,
      })
    }
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/^(\d{2})(\d{0,2})/, (_, p1, p2) => {
          if (p2) return `${p1}/${p2}`
          return p1
        })

      setCardDetails({
        ...cardDetails,
        [name]: formattedValue,
      })
    }
    // Limit CVV to 3 digits
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 3)

      setCardDetails({
        ...cardDetails,
        [name]: formattedValue,
      })
    } else {
      setCardDetails({
        ...cardDetails,
        [name]: value,
      })
    }
  }

  // Handle input changes for address
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress({
      ...address,
      [name]: value,
    })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate card number (should be 16 digits)
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    // Validate cardholder name
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }

    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format'
    } else {
      const [month, year] = cardDetails.expiryDate.split('/')
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month'
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired'
      }
    }

    // Validate CVV (should be 3 digits)
    if (cardDetails.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits'
    }

    // Validate amount
    if (
      !cardDetails.amount ||
      isNaN(cardDetails.amount) ||
      parseFloat(cardDetails.amount) <= 0
    ) {
      newErrors.amount = 'Please enter a valid amount'
    }

    // Validate address fields
    if (!address.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!address.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required'
    }
    if (!address.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!address.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required'
    }
    if (!address.country.trim()) {
      newErrors.country = 'Country is required'
    }
    if (!address.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Create order object
      const order = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(cardDetails.amount),
        paymentStatus: 'Paid',
        paymentMethod: 'Credit Card',
        cardDetails: {
          lastFour: cardDetails.cardNumber.slice(-4),
          cardholderName: cardDetails.cardholderName,
        },
        address: address,
        items: cartItems.map((item) => ({
          title: item.name,
          quantity: item.amount,
          price: item.price,
          image: item.image,
        })),
      }

      // Add order to Redux store
      dispatch(addOrder(order))

      // Clear the cart in Redux store
      dispatch(clearCart())

      // Set flag for successful checkout
      sessionStorage.setItem('checkout_completed', 'true')

      // Navigate to thank you page
      navigate('/thank-you')
    }
  }

  // Handle pending payment submission
  const handlePendingSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Create order object with Pending status
      const order = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(cardDetails.amount),
        paymentStatus: 'Pending',
        paymentMethod: 'Credit Card',
        cardDetails: {
          lastFour: cardDetails.cardNumber.slice(-4),
          cardholderName: cardDetails.cardholderName,
        },
        address: address,
        items: cartItems.map((item) => ({
          title: item.name,
          quantity: item.amount,
          price: item.price,
          image: item.image,
        })),
      }

      // Add order to Redux store
      dispatch(addOrder(order))

      // For pending orders, we don't clear the cart
      // This allows users to complete the payment later

      // Navigate to orders page
      navigate('/products')
    }
  }

  // Auto-fill with dummy data
  const fillDummyData = () => {
    setCardDetails({
      ...cardDetails,
      cardNumber: '4111 1111 1111 1111',
      cardholderName: 'John Doe',
      expiryDate: '12/25',
      cvv: '123',
    })

    setAddress({
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '555-123-4567',
    })
  }

  // Fill with rejected payment data
  const fillRejectedData = () => {
    setCardDetails({
      ...cardDetails,
      cardNumber: '4000 0000 0000 0002',
      cardholderName: 'Jane Smith',
      expiryDate: '10/24',
      cvv: '456',
    })

    setAddress({
      fullName: 'Jane Smith',
      streetAddress: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States',
      phone: '555-987-6543',
    })

    // Create and save a rejected payment order
    const order = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(cardDetails.amount),
      paymentStatus: 'Failed',
      paymentMethod: 'Credit Card',
      cardDetails: {
        lastFour: '0002',
        cardholderName: 'Jane Smith',
      },
      address: {
        fullName: 'Jane Smith',
        streetAddress: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'United States',
        phone: '555-987-6543',
      },
      items: cartItems.map((item) => ({
        title: item.name,
        quantity: item.amount,
        price: item.price,
        image: item.image,
      })),
    }

    // Add order to Redux store
    dispatch(addOrder(order))

    // Navigate to orders page
    navigate('/products')
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Breadcrumbs title="Checkout" />
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 flex flex-col md:flex-row justify-between gap-4"
      >
        {/* Shipping Address Section */}
        <div className="flex-1">
          <div className="bg-base-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${
                    errors.fullName ? 'input-error' : ''
                  }`}
                />
                {errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.fullName}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Street Address</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleAddressChange}
                  placeholder="123 Main St"
                  className={`input input-bordered w-full ${
                    errors.streetAddress ? 'input-error' : ''
                  }`}
                />
                {errors.streetAddress && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.streetAddress}
                    </span>
                  </label>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="New York"
                    className={`input input-bordered w-full ${
                      errors.city ? 'input-error' : ''
                    }`}
                  />
                  {errors.city && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.city}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">State/Province</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    placeholder="NY"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ZIP/Postal Code</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleAddressChange}
                    placeholder="10001"
                    className={`input input-bordered w-full ${
                      errors.zipCode ? 'input-error' : ''
                    }`}
                  />
                  {errors.zipCode && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.zipCode}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    placeholder="United States"
                    className={`input input-bordered w-full ${
                      errors.country ? 'input-error' : ''
                    }`}
                  />
                  {errors.country && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.country}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="555-123-4567"
                  className={`input input-bordered w-full ${
                    errors.phone ? 'input-error' : ''
                  }`}
                />
                {errors.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.phone}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="flex-1">
          <div className="bg-base-100 p-4 rounded-lg shadow-sm">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl">Payment Details</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fillDummyData}
                  className="btn btn-sm btn-outline"
                >
                  Fill with Test Data
                </button>
                <button
                  type="button"
                  onClick={fillRejectedData}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Rejected Payment
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Card Number</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`input input-bordered w-full ${
                    errors.cardNumber ? 'input-error' : ''
                  }`}
                />
                {errors.cardNumber && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.cardNumber}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cardholder Name</span>
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${
                    errors.cardholderName ? 'input-error' : ''
                  }`}
                />
                {errors.cardholderName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.cardholderName}
                    </span>
                  </label>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiry Date</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`input input-bordered w-full ${
                      errors.expiryDate ? 'input-error' : ''
                    }`}
                  />
                  {errors.expiryDate && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.expiryDate}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">CVV</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className={`input input-bordered w-full ${
                      errors.cvv ? 'input-error' : ''
                    }`}
                  />
                  {errors.cvv && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.cvv}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="text"
                  name="amount"
                  value={cardDetails.amount}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    errors.amount ? 'input-error' : ''
                  }`}
                  readOnly
                />
                {errors.amount && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.amount}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-success flex-1">
                Complete Payment
              </button>
              <button
                type="button"
                onClick={handlePendingSubmit}
                className="btn btn-warning flex-1"
              >
                Save as Pending
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
