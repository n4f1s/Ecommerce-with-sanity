"use client";

import useOrderStore from "@/store/orderStore";

const Orders = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No orders found.
      </p>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-100 shadow-lg rounded-lg p-6 border border-gray-200 max-w-3xl mx-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Order Number: #{order.id}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "confirmed"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "shipped"
                  ? "bg-purple-100 text-purple-800"
                  : order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <p>
                <strong>Customer Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Phone Number:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> Tk {order.totalPrice}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Address:</strong> {order.address}, {order.city}, {order.division},{" "}
                {order.postalCode}
              </p>
              {order.deliveryInstruction && (
                <p>
                  <strong>Delivery Instructions:</strong> {order.deliveryInstruction}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xl text-theme-primary font-bold mb-2">Products-</h4>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.product._id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-2"
                >
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-700 text-sm">
                    Quantity: {item.quantity} | Tk {item.product.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
