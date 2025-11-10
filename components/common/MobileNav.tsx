"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, ListOrdered, ShoppingCart, Search } from "lucide-react"
import { CartCountBadge, OrderCountBadge } from "@/components/common/ClientCounts"
import MobileSearchModal from "@/components/search/MobileSearchModal"
import { useState } from "react"

export default function MobileNav() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <>
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white pb-[max(env(safe-area-inset-bottom),0px)]"
        aria-label="Bottom navigation"
      >
        <ul className="mx-auto flex max-w-[640px] justify-around items-center gap-1 px-2 pb-2 pt-3 text-xs">
          <li className="flex justify-center">
            <Link href="/" className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${isActive("/") ? "text-theme-secondary" : "text-gray-800"}`} aria-label="Home">
              <Home className="size-5" />
              <span>Home</span>
            </Link>
          </li>

          <li className="flex justify-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${isActive("/search") ? "text-theme-secondary" : "text-gray-800"}`}
              aria-label="Open search"
            >
              <Search className="size-5" />
              <span>Search</span>
            </button>
          </li>

          <li className="flex justify-center">
            <Link href="/products" className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${isActive("/products") ? "text-theme-secondary" : "text-gray-800"}`} aria-label="Products">
              <Grid3X3 className="size-5" />
              <span>Products</span>
            </Link>
          </li>

          <li className="flex justify-center">
            <Link href="/cart" className={`relative flex flex-col items-center gap-1 rounded-md px-2 py-1 ${isActive("/cart") ? "text-theme-secondary" : "text-gray-800"}`} aria-label="Cart">
              <ShoppingCart className="size-5" />
              <span>Cart</span>
              <CartCountBadge />
            </Link>
          </li>

          <li className="flex justify-center">
            <Link href="/orders" className={`relative flex flex-col items-center gap-1 rounded-md px-2 py-1 ${isActive("/orders") ? "text-theme-secondary" : "text-gray-800"}`} aria-label="Orders">
              <ListOrdered className="size-5" />
              <span>Orders</span>
              <OrderCountBadge />
            </Link>
          </li>
        </ul>
      </nav>

      <MobileSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
