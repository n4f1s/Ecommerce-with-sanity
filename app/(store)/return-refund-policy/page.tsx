import { Metadata } from "next"
import { ArrowLeft, Package, RefreshCw, Clock, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Return & Refund Policy | ShopHikes",
  description: "Learn about our hassle-free return and refund process. 7-day returns, fast refunds.",
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-theme-primary text-white">
        <div className="wrapper">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Return & Refund Policy</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl">
            We want you to love your purchase. If you are not satisfied, we are here to help with our simple return process.
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
              <h3 className="font-semibold text-gray-900 mb-1">7-Day Returns</h3>
              <p className="text-sm text-gray-600">Return within 7 days of delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-theme-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Easy Process</h3>
              <p className="text-sm text-gray-600">Simple returns, no hassle</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-theme-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Refunds</h3>
              <p className="text-sm text-gray-600">Processed within 5-7 business days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrapper py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* Return Eligibility */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
            <p className="text-gray-700 mb-4">
              To be eligible for a return, your item must meet the following conditions:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Returned within <strong>7 days</strong> of receiving your order</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Item must be unused, unworn, and in original condition</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Original packaging, tags, and labels must be intact</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Proof of purchase (order number or receipt) is required</span>
              </li>
            </ul>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
            <p className="text-gray-700 mb-4">The following items cannot be returned:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Personal care items (skin care, cosmetics)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Sale or clearance items</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Items damaged due to misuse or negligence</span>
              </li>
            </ul>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Contact Us</h4>
                  <p className="text-gray-700 text-sm">
                    Message us via <Link href="https://www.facebook.com/shophikesfb" target="_blank" className="text-theme-primary hover:underline">Facebook</Link> or{" "}
                    <a href="https://wa.me/8801884594333" className="text-theme-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>{" "}
                    with your order number and reason for return.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Get Approval</h4>
                  <p className="text-gray-700 text-sm">
                    Our team will review your request and provide return instructions within 48 hours.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ship the Item</h4>
                  <p className="text-gray-700 text-sm">
                    Pack the item securely in its original packaging and ship it to the address provided. You are responsible for return shipping costs unless the item is defective.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-sm font-semibold">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Receive Your Refund</h4>
                  <p className="text-gray-700 text-sm">
                    Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Refund Policy</h2>
            <p className="text-gray-700 mb-4">
              Refunds will be issued to your original payment method. Please note:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold">•</span>
                <span>Processing time: <strong>5-7 business days</strong> after we receive your return</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold">•</span>
                <span>Bank processing may take an additional 3-5 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-theme-primary font-bold">•</span>
                <span>Shipping fees are non-refundable (unless item is defective)</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-theme-primary to-theme-secondary rounded-xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-white/90 mb-6">
              Our support team is here to assist with your return or refund.
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
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
