"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck} from "lucide-react";
import Image from "next/image";

const Footer = () => {

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-white border-t border-gray-200 text-gray-700"
    >
      {/* Top CTA: newsletter */}
      {/* <section className="wrapper">
        <div className="rounded-2xl border border-gray-200 bg-[#EFFFFA]">
          <div className="flex flex-col md:flex-row items-center gap-4 p-5">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900">Stay in the loop</h3>
              <p className="text-sm text-gray-600">New arrivals, exclusive deals, and tips to get more from your gear.</p>
            </div>

            <Form action="/api/subscribe" className="w-full md:w-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <div className="relative flex">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full md:w-80 rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-r-md bg-theme-primary px-3 py-2 text-sm font-semibold text-white hover:bg-theme-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary"
                  aria-label="Subscribe"
                >
                  Subscribe <ArrowRight className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
            </Form>
          </div>
        </div>
      </section> */}

      {/* Link grid */}
      <nav className="wrapper" aria-label="Footer navigation">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-theme-primary">
              ShopHikes
            </Link>
            <p className="mt-3 text-sm">
              Premium products for your everyday use.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {/* Address - opens Google Maps */}
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=106+BCC+Road+Nowabpur+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-theme-primary transition-colors group"
                  aria-label="View our location on Google Maps"
                >
                  <MapPin className="size-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>106 BCC Road, Nowabpur, Dhaka</span>
                </a>
              </li>

              {/* Phone - opens dialer */}
              <li>
                <a
                  href="tel:+8801884594333"
                  className="flex items-center gap-2 text-gray-700 hover:text-theme-primary transition-colors group"
                  aria-label="Call us at +880 1884 594 333"
                >
                  <Phone className="size-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+880 1884 594 333</span>
                </a>
              </li>

              {/* Email - opens mail client */}
              <li>
                <a
                  href="mailto:support@shophikes.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-theme-primary transition-colors group"
                  aria-label="Email us at support@shophikes.com"
                >
                  <Mail className="size-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>support@shophikes.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          {/* <div>
            <h4 className="text-sm font-semibold text-gray-900">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/new">New arrivals</Link></li>
              <li><Link href="/bestsellers">Best sellers</Link></li>
            </ul>
          </div> */}

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Help</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/shipping" className="hover:text-theme-primary">Shipping Info</Link></li>
              <li>
                <Link href="/return-refund-policy" className="hover:text-theme-primary">
                  Return & Refund
                </Link>
              </li>
              <li><Link href="/orders" className="hover:text-theme-primary">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Contact Us</h4>

            <ul className="mt-3 flex items-center gap-3">
              {/* Facebook */}
              <li>
                <a
                  href="https://www.facebook.com/shophikesfb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on Facebook"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-[#1877F2]/10 transition-colors text-white"
                >
                  <Image
                    src="/fb.svg"
                    width={30}
                    height={30}
                    alt="Facebook"
                    priority={false}
                  />
                </a>
              </li>

              {/* WhatsApp (Bangladesh number) */}
              <li>
                <a
                  href="https://wa.me/8801884594333"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-[#25D366]/10 
                  text-[#25D366] transition-colors"
                >
                  <Image
                    src="/whatsapp.svg"
                    width={24}
                    height={24}
                    alt="Facebook"
                    priority={false}
                  />
                </a>
              </li>
            </ul>

            {/* Helper text (optional) */}
            <p className="mt-2 text-xs text-gray-500 max-w-[200px] text-justify">
              Reach us on Facebook or WhatsApp. If the app isn’t installed, your browser will open instead.
            </p>
          </div>


          {/* Trust & app */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Trust & Safety</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-theme-primary" /> SSL secured</li>
              <li>5‑7 day easy returns</li>
              <li>Cash on delivery</li>
              <li>Warranty on select items</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Legal bar */}
      <div className="border-t border-gray-200">
        <div className="sm:px-16 px-4 max-w-[1500px] mx-auto py-4 text-xs text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2025 ShopHikes. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
