import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSelectedOrder,
  clearSelectedOrder,
  updateOrderStatus,
} from '../features/orders/ordersSlice'
import { getStatusBadgeClass } from '../utils/data'
import { clearCart } from '../features/cart/cartSlice'

const Orders = () => {
  const dispatch = useDispatch()
  const { orders, selectedOrder } = useSelector((state) => state.orders)

  // Function to determine badge color based on payment status

  // Function to view order details
  const viewOrderDetails = (order) => {
    dispatch(setSelectedOrder(order))
  }

  // Function to close order details modal
  const closeOrderDetails = () => {
    dispatch(clearSelectedOrder())
  }

  // Function to update order status (optional feature)
  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }))

    // If the status is changed to "Paid", clear the cart
    if (newStatus === 'Paid') {
      dispatch(clearCart())
    }
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          <div>
            <span>
              No orders found. Complete a checkout to see orders here.
            </span>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Card</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover">
                  <td>#{order.id.toString().slice(-4)}</td>
                  <td>{order.date}</td>
                  <td>
                    {order.cardDetails?.cardholderName} (****{' '}
                    {order.cardDetails?.lastFour})
                  </td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>
                    <div
                      className={`badge ${getStatusBadgeClass(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Order #{selectedOrder.id.toString().slice(-4)}
                </h3>
                <button
                  onClick={closeOrderDetails}
                  className="btn btn-sm btn-circle"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Information */}
                <div>
                  <h4 className="font-semibold mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {selectedOrder.date}
                    </p>
                    <p>
                      <span className="font-medium">Payment Status:</span>{' '}
                      {selectedOrder.paymentStatus}
                    </p>
                    <p>
                      <span className="font-medium">Payment Method:</span>{' '}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Total Amount:</span> $
                      {selectedOrder.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.address && (
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <div className="space-y-1 text-sm">
                      <p>{selectedOrder.address.fullName}</p>
                      <p>{selectedOrder.address.streetAddress}</p>
                      <p>
                        {selectedOrder.address.city},{' '}
                        {selectedOrder.address.state}{' '}
                        {selectedOrder.address.zipCode}
                      </p>
                      <p>{selectedOrder.address.country}</p>
                      <p>Phone: {selectedOrder.address.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Order Items</h4>
                  <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="flex items-center gap-2">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              )}
                              <span>{item.title}</span>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="text-right font-bold">
                            Order Total:
                          </td>
                          <td className="font-bold">
                            ${selectedOrder.amount.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Optional: Add status update buttons */}
              {selectedOrder.paymentStatus === 'Pending' && (
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'Paid')}
                    className="btn btn-sm btn-success"
                  >
                    Mark as Paid
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder.id, 'Failed')
                    }
                    className="btn btn-sm btn-error"
                  >
                    Mark as Failed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
