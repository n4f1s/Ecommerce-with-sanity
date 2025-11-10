import { Metadata } from "next"
import { ArrowLeft, Truck, MapPin, Clock, Package } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Shipping Information | ShopHikes",
  description: "Learn about our shipping zones, delivery times, and costs. Fast and reliable delivery across Bangladesh.",
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-theme-primary text-white py-12 sm:py-16">
        <div className="wrapper">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Shipping Information</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl">
            We deliver across Bangladesh. Get your orders fast with transparent costs and tracking.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-start gap-4 p-5 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-theme-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">3-5 Days</h3>
              <p className="text-sm text-gray-600">Standard delivery inside Dhaka</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-theme-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Nationwide</h3>
              <p className="text-sm text-gray-600">Shipping to all districts</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
              <Truck className="h-5 w-5 text-theme-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Real-Time Tracking</h3>
              <p className="text-sm text-gray-600">Track your order anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrapper">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* Shipping Zones & Costs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Shipping Zones & Costs</h2>
            <p className="text-gray-700 mb-6">
              Shipping fees are calculated based on your delivery location and order weight.
            </p>

            <div className="space-y-4">
              {/* Inside Dhaka */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <MapPin className="h-5 w-5 text-theme-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Inside Dhaka</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Dhaka City, Gulshan, Banani, Dhanmondi, Mirpur, Uttara, and surrounding areas
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-theme-primary">Tk 80</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">3-5 business days</span>
                  </div>
                </div>
              </div>

              {/* Outside Dhaka */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <MapPin className="h-5 w-5 text-theme-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Outside Dhaka</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Chittagong, Sylhet, Khulna, Rajshahi, Barisal, Rangpur, Mymensingh, and other districts
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-theme-primary">Tk 120</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">5-7 business days</span>
                  </div>
                </div>
              </div>

              {/* Remote Areas */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
                <MapPin className="h-5 w-5 text-theme-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Remote Areas</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Sub-districts, upazilas, and hard-to-reach locations
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-theme-primary">Tk 120</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">7-10 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Processing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Order Processing Time</h2>
            <p className="text-gray-700 mb-4">
              We process orders quickly to get your items shipped as soon as possible.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Package className="h-5 w-5 text-theme-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Standard Orders</h4>
                  <p className="text-sm text-gray-700">
                    Processed and dispatched within <strong>1-2 business days</strong>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Package className="h-5 w-5 text-theme-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Pre-Order Items</h4>
                  <p className="text-sm text-gray-700">
                    Processing time varies; check product page for details
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Package className="h-5 w-5 text-theme-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Bulk Orders</h4>
                  <p className="text-sm text-gray-700">
                    Contact us for custom processing and shipping arrangements
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Tracking Your Order */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
            <p className="text-gray-700 mb-6">
              Stay updated on your shipment every step of the way.
            </p>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Order Confirmation</h4>
                  <p className="text-gray-700 text-sm">
                    You will receive a confirmation with your order number immediately after placing your order.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Shipment Notification</h4>
                  <p className="text-gray-700 text-sm">
                    Once shipped, we will send you a tracking number via email or SMS.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Track Online</h4>
                  <p className="text-gray-700 text-sm">
                    Visit <Link href="/orders" className="text-theme-primary hover:underline font-semibold">My Orders</Link> to view real-time tracking updates.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Delivery Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Important Delivery Notes</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold mt-1">•</span>
                <span>Please provide accurate contact details and full delivery address to avoid delays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold mt-1">•</span>
                <span>Our delivery partner will call you before delivery. Please keep your phone accessible.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold mt-1">•</span>
                <span>Deliveries are made Monday–Saturday, excluding public holidays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold mt-1">•</span>
                <span>If you are unavailable, the courier will attempt redelivery or you can arrange pickup from a nearby hub.</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-theme-primary to-theme-secondary rounded-xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Have Questions?</h3>
            <p className="text-white/90 mb-6">
              Reach out if you need help with your shipment or have delivery concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-theme-primary px-6 py-3 font-semibold hover:shadow-lg transition-shadow"
              >
                Contact Us
              </Link>
              <Link
                href="/orders"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
