import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | ShopHikes",
  description: "Terms and conditions for using ShopHikes in Bangladesh, including orders, payments, shipping, and returns.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-theme-primary text-white py-12 sm:py-16">
        <div className="wrapper">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl">
            Please read these terms carefully before using ShopHikes. By accessing or ordering, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="wrapper">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* Intro */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p className="text-gray-700">
              These Terms of Service (“Terms”) govern your use of ShopHikes (the “Site”) and purchases made from us. The Site is operated in Dhaka, Bangladesh. References to “we”, “us”, or “our” mean ShopHikes. By using the Site, you confirm you are at least 18 years old or have parental consent, and reside in Bangladesh or agree to applicable Bangladeshi laws.
            </p>
          </div>

          {/* Accounts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">2. Accounts & Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Provide accurate information and keep your login credentials secure.</li>
              <li>You are responsible for all activity under your account.</li>
              <li>Notify us immediately if you suspect unauthorized access.</li>
            </ul>
          </div>

          {/* Orders & Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">3. Orders, Pricing & Availability</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>All prices are listed in Bangladeshi Taka (BDT) and include VAT where applicable.</li>
              <li>Product availability is subject to change; we may cancel and refund if an item is unavailable or mispriced.</li>
              <li>We reserve the right to limit quantities per customer to prevent misuse or reselling.</li>
            </ul>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">4. Payments</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>We accept Cash on Delivery (COD) and digital payments through approved gateways.</li>
              <li>For COD, please keep the exact amount ready upon delivery.</li>
              <li>Refunds (where eligible) are issued to the original payment method per our Return & Refund Policy.</li>
            </ul>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">5. Shipping & Delivery</h2>
            <p className="text-gray-700 mb-3">
              We deliver across Bangladesh via reputable courier partners. Estimated timelines and fees are outlined on our{" "}
              <Link href="/shipping" className="text-theme-primary font-semibold hover:underline">Shipping Info</Link>{" "}
              page. Delivery dates are estimates and may vary due to courier capacity, weather, or public holidays.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Provide accurate address and a reachable phone number to avoid delays.</li>
              <li>Couriers may contact you before delivery and attempt redelivery if needed.</li>
            </ul>
          </div>

          {/* Returns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">6. Returns & Refunds</h2>
            <p className="text-gray-700">
              Returns are accepted per our{" "}
              <Link href="/return-refund-policy" className="text-theme-primary font-semibold hover:underline">Return & Refund Policy</Link>.
              Items must be returned in original condition within the stated return window. Some categories (e.g., personal care) may be non-returnable for hygiene reasons.
            </p>
          </div>

          {/* Product Use & Warranty */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">7. Product Use & Warranty</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Use products as directed by the manufacturer; misuse voids warranty and returns.</li>
              <li>Manufacturer warranties (if any) apply; we facilitate claims where possible.</li>
            </ul>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">8. Prohibited Activities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Fraudulent orders, chargeback abuse, or attempts to bypass payment systems.</li>
              <li>Interfering with the Site’s security or attempting unauthorized access.</li>
              <li>Posting unlawful, harmful, or infringing content in reviews or messages.</li>
            </ul>
          </div>

          {/* Liability & Disclaimers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">9. Liability & Disclaimers</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To the maximum extent permitted by Bangladeshi law, we are not liable for indirect or consequential losses.</li>
              <li>Product images are illustrative; actual colors or packaging may vary.</li>
              <li>We do not guarantee uninterrupted access to the Site due to maintenance or network issues.</li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">10. Privacy</h2>
            <p className="text-gray-700">
              Your personal data is handled per our Privacy Policy and applicable laws of Bangladesh, including data sharing with courier and payment partners solely for order fulfillment.
            </p>
          </div>

          {/* Governing Law & Disputes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">11. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dhaka. We encourage amicable resolution through our support team first.
            </p>
          </div>

          {/* Changes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">12. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. The latest version will be posted on this page with the “Last updated” date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              For questions about these Terms, contact us at{" "}
              <a href="mailto:support@shophikes.com" className="text-theme-primary font-semibold hover:underline">
                support@shophikes.com
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/8801884594333" className="text-theme-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                +880 1884 594 333
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
