// app/(shop)/privacy/page.tsx
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | ShopHikes",
  description: "How ShopHikes collects, uses, and protects your personal information in Bangladesh.",
}

export default function PrivacyPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl">
            Your privacy matters. This policy explains what we collect, why we collect it, and how we protect your data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="wrapper">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* Introduction */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p className="text-gray-700">
              ShopHikes operates in Dhaka, Bangladesh. This Privacy Policy describes how we handle personal information when you visit our website, create an account, or place an order. By using our services, you consent to this Policy.
            </p>
          </div>

          {/* Data We Collect */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Account details: name, email, phone number, address.</li>
              <li>Order details: items, amounts, delivery information.</li>
              <li>Payment info: handled by secure payment gateways; we do not store full card data.</li>
              <li>Technical data: IP address, device info, browser type, cookies for analytics and preferences.</li>
              <li>Communications: messages via email, WhatsApp, Facebook, or on-site forms.</li>
            </ul>
          </div>

          {/* How We Use Data */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Process and deliver your orders, including updates and tracking.</li>
              <li>Provide customer support and handle returns/refunds.</li>
              <li>Improve our products, services, and website experience.</li>
              <li>Prevent fraud and ensure account security.</li>
              <li>Send service-related notifications; marketing messages only with your consent (opt-out anytime).</li>
            </ul>
          </div>

          {/* Sharing & Disclosure */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">4. Sharing Your Information</h2>
            <p className="text-gray-700 mb-3">
              We share data only with trusted partners for specific purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Couriers: delivery address and contact to fulfill shipments.</li>
              <li>Payment gateways: process payments securely.</li>
              <li>Service providers: analytics, hosting, customer support tools.</li>
              <li>Legal compliance: when required by Bangladeshi law or to protect our rights and users.</li>
            </ul>
            <p className="text-gray-700 mt-3">
              We do not sell your personal information.
            </p>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">5. Cookies & Tracking</h2>
            <p className="text-gray-700">
              We use cookies and similar technologies to keep you signed in, remember cart items, and analyze site usage. You can control cookies through your browser settings, but some features may not work without them.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
            <p className="text-gray-700">
              We retain your information for as long as needed to provide services and comply with legal obligations (e.g., tax and accounting records in Bangladesh). You may request deletion of your account and we will honor it unless we must keep data for legal reasons.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">7. Your Choices & Rights</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Access and update your account information.</li>
              <li>Opt out of marketing messages via unsubscribe links or by contacting us.</li>
              <li>Request deletion of your account and personal data (subject to legal requirements).</li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">8. Security</h2>
            <p className="text-gray-700">
              We implement reasonable technical and organizational measures to protect your data (HTTPS, access controls, encryption where appropriate). No method of transmission is 100% secure, but we strive to safeguard your information.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">9. Children’s Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to children under 13. If you believe a child provided personal data, contact us to remove it.
            </p>
          </div>

          {/* International Transfers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">10. International Data Transfers</h2>
            <p className="text-gray-700">
              Some service providers may process data outside Bangladesh. We work with reputable vendors who apply appropriate safeguards.
            </p>
          </div>

          {/* Changes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Policy periodically. The latest version will always be available on this page with the “Last updated” date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">12. Contact Us</h2>
            <p className="text-gray-700">
              For privacy questions or requests, email{" "}
              <a href="mailto:support@shophikes.com" className="text-theme-primary font-semibold hover:underline">
                support@shophikes.com
              </a>{" "}
              or WhatsApp{" "}
              <a href="https://wa.me/8801884594333." className="text-theme-primary font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                +880 1884 594 333
              </a>.
            </p>
          </div>

          {/* Links to related pages */}
          <div className="text-sm text-gray-700">
            See also:{" "}
            <Link href="/terms" className="text-theme-primary hover:underline font-semibold">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/returns" className="text-theme-primary hover:underline font-semibold">Return & Refund</Link>.
          </div>
        </div>
      </section>
    </div>
  )
}
