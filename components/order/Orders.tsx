"use client";

import useOrderStore from "@/store/order-store";
import { Package, Phone, MapPin, CreditCard, Calendar, FileText, Truck, File } from "lucide-react";
import OrderStatusStepper from "./OrderStatusStepper";
import { useOrderStatusSync } from "@/hooks/hooks/useOrderStatusSync";
import Link from "next/link";


const Orders = () => {
  // Enable status sync (checks every 30 seconds)
  useOrderStatusSync(30000);

  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
        <p className="text-gray-600 mb-6">
          You haven&apos;t placed any orders. Start shopping to see your orders here!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-theme-primary text-white rounded-lg font-semibold hover:bg-theme-secondary transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[...orders].reverse().map((order) => {
        // Calculate subtotal (total - delivery charge)
        const subtotal = order.totalPrice - order.deliveryCharge;

        return (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-theme-primary">#</span>
                    {order.id}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {order.orderDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Stepper */}
            <div className="bg-gray-50 px-4 py-6 border-b">
              <OrderStatusStepper currentStatus={order.status} />
            </div>

            {/* Order Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <File size={17} />
                    </span>
                    Customer Information
                  </h4>

                  <div className="space-y-3 pl-10">
                    <div className="flex items-start gap-3">
                      <div className="text-gray-500 min-w-[24px]">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                        <p className="font-medium text-gray-800">{order.customerName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-theme-primary mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                        <p className="font-medium text-gray-800">{order.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Payment</p>
                        <p className="font-medium text-gray-800">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </span>
                    Delivery Address
                  </h4>

                  <div className="pl-10 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {order.address}<br />
                      {order.city && `${order.city}, `}
                      {order.upazila}, {order.district}<br />
                      {order.division} - {order.postalCode}
                    </p>
                  </div>

                  {order.deliveryInstruction && (
                    <div className="pl-10">
                      <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <FileText className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-yellow-700 font-semibold uppercase tracking-wide mb-1">
                            Delivery Note
                          </p>
                          <p className="text-sm text-yellow-800 italic">
                            &quot;{order.deliveryInstruction}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </span>
                  Order Items
                </h4>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.product._id}-${index}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.product.name ?? "Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tk {item.product.price ?? 0} × {item.quantity ?? 0}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          Tk {((item.product.price ?? 0) * (item.quantity ?? 0))}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity ?? 0}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 space-y-3 bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">Tk {subtotal}</span>
                  </div>

                  {/* Delivery Charge */}
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium flex items-center gap-2">
                      <Truck className="w-4 h-4 text-theme-primary" />
                      Delivery Charge
                    </span>
                    <span className="font-semibold">Tk {order.deliveryCharge}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-gray-300 my-2" />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-theme-primary">
                      Tk {order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
