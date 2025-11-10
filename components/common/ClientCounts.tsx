"use client"

import useCartStore from "@/store/cart-store"
import useOrderStore from "@/store/order-store"

export function CartCountBadge() {
  const count = useCartStore((s) => s.items.reduce((t, i) => t + i.quantity, 0))
  if (!count) return null
  return (
    <span className="absolute -top-2 -right-2 sm:-right-4 bg-red-500 text-white rounded-full size-5 sm:size-6 flex items-center justify-center text-[10px] sm:text-xs">
      {count}
    </span>
  )
}

export function OrderCountBadge() {
  const count = useOrderStore((s) => s.orders.length)
  if (!count) return null
  return (
    <span className="absolute -top-2 -right-0 sm:-right-4 bg-red-500 text-white rounded-full size-5 sm:size-6 flex items-center justify-center text-[10px] sm:text-xs">
      {count}
    </span>
  )
}
