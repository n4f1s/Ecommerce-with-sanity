"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"

import { Search, X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import type { Category, Product } from "@/sanity.types"
import ProductCard from "../product/ProductCard"

type Bootstrap = {
  categories: Category[]
  featured: Product[]
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileSearchModal({ open, onClose }: Props) {
  const titleId = useId()
  const inputId = useId()

  const [query, setQuery] = useState("")
  const [boot, setBoot] = useState<Bootstrap | null>(null)
  const [bootLoading, setBootLoading] = useState(false)
  const [bootError, setBootError] = useState<string | null>(null)

  // Lazy fetch bootstrap data only when modal opens
  useEffect(() => {
    if (!open || boot) return
    let cancelled = false
    ;(async () => {
      setBootLoading(true)
      setBootError(null)
      try {
        const res = await fetch("/api/search/bootstrap", {
          cache: "default",
          next: { revalidate: 600 },
        })
        if (!res.ok) throw new Error(`Bootstrap ${res.status}`)
        const data = (await res.json()) as Bootstrap
        if (!cancelled) setBoot(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setBootError(e?.message || "Failed to load")
      } finally {
        if (!cancelled) setBootLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open, boot])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Focus input on open (after animation)
  useEffect(() => {
    if (!open) return
    const to = setTimeout(() => {
      const el = document.getElementById(inputId) as HTMLInputElement | null
      el?.focus()
    }, 280)
    return () => clearTimeout(to)
  }, [open, inputId])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <style jsx global>{`
        @keyframes slideInLeftSearch {
          from { transform: translateX(-100%); opacity: .98; }
          to   { transform: translateX(0);      opacity: 1;  }
        }
      `}</style>

      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="fixed inset-0 z-[60] sm:hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

        {/* Drawer */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[86vw] max-w-[560px] bg-white shadow-2xl flex flex-col"
          style={{ transform: "translateX(-100%)", animation: "slideInLeftSearch 260ms ease-out forwards" }}
        >
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 id={titleId} className="text-xl font-bold">Search</h2>
            <button
              type="button"
              aria-label="Close search modal"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search input */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="relative">
              <label htmlFor={inputId} className="sr-only">Search products</label>
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-lg border border-gray-300 bg-white pl-11 pr-10 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-theme-primary"
                autoComplete="off"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            {/* TRENDING NOW */}
            <section aria-labelledby="trend-title">
              <h3 id="trend-title" className="text-[13px] font-semibold tracking-wide text-gray-700 mb-2">
                Trending Now
              </h3>

              {/* Loading skeletons */}
              {!boot && bootLoading && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-7 w-24 rounded-full bg-gray-100 animate-pulse" />
                  ))}
                </div>
              )}

              {bootError && <p className="text-sm text-red-600">{bootError}</p>}

              {boot?.categories && (
                <div className="flex flex-wrap gap-2">
                  {boot.categories.slice(0, 3).map((c) => {
                    const slug = c.slug?.current ?? ""
                    const title = (c.title ?? slug) ?? "Category"
                    return (
                      <Link
                        key={c._id}
                        href={slug ? `/products?category=${encodeURIComponent(slug)}` : "/products"}
                        className="inline-flex items-center gap-1.5 rounded-full border border-theme-primary/30 bg-theme-primary/10 px-3 py-1.5 text-xs text-theme-primary hover:bg-theme-primary/20"
                      >
                        <Search className="h-3.5 w-3.5" />
                        {title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>

            {/* FEATURED SLIDER (acts as Popular) */}
            {bootLoading && !boot && (
              <section>
                <h3 className="text-[13px] font-semibold tracking-wide text-gray-700 mb-2">Popular Products</h3>
                <div className="flex gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-36 rounded-lg border border-gray-200 overflow-hidden">
                      <div className="aspect-[4/5] bg-gray-100 animate-pulse" />
                      <div className="p-2">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {boot?.featured?.length ? (
              <section aria-labelledby="pop-title">
                <h3 id="pop-title" className="text-[13px] font-semibold tracking-wide text-gray-700 mb-2">
                  Popular Products
                </h3>
                <Swiper spaceBetween={12} slidesPerView={1.5} className="pb-2">
                  {boot.featured.map((product) => (
                    <SwiperSlide key={product._id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
