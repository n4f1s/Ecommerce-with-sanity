"use client";

import { Button } from "@/components/ui/button";
import useOrderStore from "@/store/order-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Package, Phone, MapPin, CreditCard, ShoppingBag } from "lucide-react";

export default function CartEmptyOrLastOrder() {
  const router = useRouter();
  const { getLastOrder } = useOrderStore();
  const lastOrder = getLastOrder();

  if (lastOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2">
              Order Confirmed! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase
            </p>
            <div className="inline-block mt-4 px-6 py-2 bg-green-100 rounded-full">
              <p className="text-sm font-semibold text-green-700">
                Order #{lastOrder.id}
              </p>
            </div>
          </div>

          {/* Main Order Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Customer Info Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Customer Name</p>
                      <p className="font-semibold text-gray-800">{lastOrder.customerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                      <p className="font-semibold text-gray-800">{lastOrder.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📅</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Order Date</p>
                      <p className="font-semibold text-gray-800">{lastOrder.orderDate}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Method</p>
                      <p className="font-semibold text-gray-800">{lastOrder.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💰</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Status</p>
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mt-2">
                        Pending
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📦</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Order Status</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mt-2">
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Delivery Address
              </h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {lastOrder.address}<br />
                  {lastOrder.city && `${lastOrder.city}, `}
                  {lastOrder.upazila}, {lastOrder.district}<br />
                  {lastOrder.division} - {lastOrder.postalCode}
                </p>
                {lastOrder.deliveryInstruction && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Delivery Note:</p>
                    <p className="text-gray-700 italic">&quot;{lastOrder.deliveryInstruction}&quot;</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                Order Items
              </h3>

              <div className="space-y-3">
                {lastOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.product.name ?? "Product"}
                      </p>

                      {/* Selected options chips */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(item.selectedOptions)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([name, value]) => (
                              <span
                                key={`${name}:${value}`}
                                className="inline-flex items-center rounded-full border bg-white px-2.5 py-0.5 text-xs text-gray-700 shadow-sm"
                              >
                                {name}: {value}
                              </span>
                            ))}
                        </div>
                      )}

                      <p className="mt-2 text-sm text-gray-500">
                        Quantity: {item.quantity ?? 0}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        Tk {((item.product.price ?? 0) * (item.quantity ?? 0))}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tk {item.product.price ?? 0} × {item.quantity ?? 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>


              {/* Price Breakdown */}
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Tk {(lastOrder.totalPrice - lastOrder.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>Tk {lastOrder.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t-2 border-gray-300">
                  <span>Total</span>
                  <span className="text-green-600">Tk {lastOrder.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-t border-blue-100 p-6">
              <p className="text-sm text-blue-800 text-center">
                📞 আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে ডেলিভারি নিশ্চিত করতে
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven&apos;t added any items to your cart yet.
        </p>
        <Button
          onClick={() => router.push("/")}
          size="lg"
          className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
