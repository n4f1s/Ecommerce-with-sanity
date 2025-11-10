import Link from "next/link"
import { ListOrdered, ShoppingCart } from "lucide-react"
import { CartCountBadge, OrderCountBadge } from "../common/ClientCounts"
import MobileNav from "../common/MobileNav"

export default async function Header() {
  return (
    <>
      <header
        className="sm:sticky top-0 z-40 bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200"
        role="banner"
        aria-label="Site header"
      >
        <div className="flex flex-wrap items-center justify-between sm:px-16 px-4 py-2 max-w-[1500px] w-full mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-theme-primary hover:opacity-70 cursor-pointer mx-auto sm:mx-0"
            aria-label="ShopHikes home"
          >
            ShopHikes
          </Link>

          {/* Desktop search form (plain server markup; submit navigates) */}
          <form
            action="/search"
            role="search"
            aria-label="Site search"
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0 md:inline hidden"
          >
            <div className="relative">
              <label htmlFor="header-search" className="sr-only">
                Search for products
              </label>
              <input
                id="header-search"
                type="search"
                name="query"
                placeholder="Search for products"
                className="bg-gray-100 text-gray-800 pl-4 pr-12 py-2 rounded border w-full max-w-4xl focus:outline-none focus:ring-2 focus:ring-theme-primary"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 h-full inline-flex w-10 items-center justify-center rounded-r bg-theme-primary text-white hover:bg-theme-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary"
              >
                {/* simple icon replacement */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5"/></svg>
              </button>
            </div>
          </form>

          {/* Buttons (desktop/tablet) */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center space-x-2 bg-theme-primary hover:bg-theme-secondary text-white font-bold py-2 px-4 rounded transition-all duration-300"
              aria-label="My Cart"
            >
              <ShoppingCart className="size-6" />
              <CartCountBadge />
              <span>My Cart</span>
            </Link>

            {/* Orders */}
            <Link
              href="/orders"
              className="relative flex items-center space-x-2 border border-gray-600 hover:bg-theme-secondary text-gray-800 hover:text-white font-bold py-2 px-4 rounded transition-all duration-300"
              aria-label="My Orders"
            >
              <ListOrdered className="size-6" />
              <OrderCountBadge />
              <span>Orders</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation (fixed) */}
        <MobileNav />
    </>
  )
}
