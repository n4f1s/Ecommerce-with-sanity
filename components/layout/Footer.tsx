"use client";

import Link from "next/link";
import Form from "next/form";
import { Mail, MapPin, Phone, ShieldCheck, ArrowRight, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-white border-t border-gray-200 text-gray-700"
    >
      {/* Top CTA: newsletter */}
      <section className="wrapper">
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
      </section>

      {/* Link grid */}
      <nav className="wrapper" aria-label="Footer navigation">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-xl font-extrabold text-theme-primary">ShopHikes</Link>
            <p className="mt-3 text-sm text-gray-600">
              Premium products for your everyday use.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="size-4" /> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2"><Phone className="size-4" /> +880 0000 000000</li>
              <li className="flex items-center gap-2"><Mail className="size-4" /> support@shophikes.com</li>
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
              <li><Link href="/shipping">Shipping info</Link></li>
              <li><Link href="/returns">Returns & exchanges</Link></li>
              <li><Link href="/support">Support center</Link></li>
              <li><Link href="/track">Track order</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about">About ShopHikes</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Trust & app */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Trust & safety</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-theme-primary" /> SSL secured</li>
              <li>7‑day easy returns</li>
              <li>Cash on delivery</li>
              <li>Warranty on select items</li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-gray-900">Follow us</h4>
            <div className="mt-3 flex gap-3 text-gray-600">
              <Link aria-label="Facebook" href="https://facebook.com"><Facebook className="size-5 hover:text-theme-primary" /></Link>
              <Link aria-label="Instagram" href="https://instagram.com"><Instagram className="size-5 hover:text-theme-primary" /></Link>
              <Link aria-label="YouTube" href="https://youtube.com"><Youtube className="size-5 hover:text-theme-primary" /></Link>
              <Link aria-label="Twitter" href="https://x.com"><Twitter className="size-5 hover:text-theme-primary" /></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Legal bar */}
      <div className="border-t border-gray-200">
        <div className="sm:px-16 px-4 max-w-[1500px] mx-auto py-4 text-xs text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2025 ShopHikes. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/cookies">Cookie Preferences</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
