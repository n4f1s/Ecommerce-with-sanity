import HeroBanner from "@/components/common/HeroBanner"
import BlackFridayBanner from "@/components/common/BlackFridayBanner"
import ProductCard from "@/components/product/ProductCard"
import Link from "next/link"
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react"
import type { Product, Category } from "@/sanity.types"

import { getAllProducts } from "@/sanity/lib/products/getAllProducts"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import Testimonials from "@/components/common/Testimonials"

export const dynamic = "force-static"
export const revalidate = 600




export default async function Home() {
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ])

  const products = Array.isArray(allProducts) ? allProducts : []
  const cats: Category[] = Array.isArray(categories) ? categories : []

  const featured: Product[] = products
    .filter((product) => product.featured === true)
  .sort((a, b) => {
    const da = Date.parse(a._createdAt || "")
    const db = Date.parse(b._createdAt || "")
    return isNaN(db) && isNaN(da) ? 0 : (db || 0) - (da || 0)
  })
  .slice(0, 4)

  const latest: Product[] = [...products]
    .sort((a, b) => {
      const da = Date.parse(a._createdAt || "")
      const db = Date.parse(b._createdAt || "")
      return isNaN(db) && isNaN(da) ? 0 : (db || 0) - (da || 0)
    })
    .slice(0, 4)

  const hasFeatured = featured.length > 0
  const hasLatest = latest.length > 0
  const hasCategories = cats.length > 0

  return (
    <div className="min-h-screen">
      {/* Hero with gradient overlay */}
      <HeroBanner />

      {/* Promo banner */}
      <BlackFridayBanner />

      {/* Categories - Elevated cards with icons */}
      {hasCategories && (
        <section aria-labelledby="categories-heading" className="bg-gradient-to-b from-white to-gray-50">
          <div className="wrapper">
            <div className="text-center mb-8 sm:mb-10">
              <h2 id="categories-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Browse by Category
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">Find exactly what you&apos;re looking for</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {cats.slice(0, 6).map((cat) => {
                const slug = cat.slug?.current ?? ""
                const title = (cat.title ?? slug) || "Category"
                const hasIcon = Boolean(cat.icon)

                return (
                  <Link
                    key={cat._id}
                    href={slug ? `/products?category=${encodeURIComponent(slug)}` : "/products"}
                    className="group relative rounded-xl bg-white border border-gray-200 p-6 text-center hover:border-theme-primary hover:shadow-lg transition-all duration-300 overflow-hidden"
                    aria-label={`Explore ${title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-theme-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Icon circle */}
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-theme-primary/10 to-theme-secondary/10 flex items-center justify-center">
                        {hasIcon ? (
                          <span className="relative inline-block size-12 rounded overflow-hidden">
                            <Image
                              src={
                                cat.icon
                                  ? urlFor(cat.icon).format("webp").width(64).height(64).bg("ffffff").url()
                                  : "/placeholder.webp"
                              }
                              alt={`${title} icon`}
                              fill
                              sizes="64px"
                              className="object-cover"
                              loading="lazy"
                            />
                          </span>
                        ) : (
                          <Search className="h-4 w-4 text-theme-primary" />
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-theme-primary transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-500 group-hover:text-theme-primary transition-colors">
                        Explore &rarr;
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products - Hero treatment */}
      {hasFeatured && (
        <section id="featured" aria-labelledby="featured-heading" className="bg-white">
          <div className="wrapper">
            {/* Header */}
            <div className="mb-8 sm:mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 id="featured-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Featured Products
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">Hand-picked just for you</p>
                </div>
              </div>

              {/* <Link
                href="/products?featured=true"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-theme-primary hover:text-theme-secondary group"
              >
                View all
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link> */}
            </div>

            {/* Grid (max 2 columns on lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featured.map((product, idx) => (
                <article
                  key={product._id}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow w-full sm:h-[350px]"
                >
                  {/* Accent rail */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-theme-primary to-theme-secondary" />

                  {/* Ribbon for first item */}
                  {idx === 0 && (
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary px-3 py-1 text-xs font-semibold text-white shadow">
                      Top Pick
                    </div>
                  )}

                  {/* Card body: image + content split */}
                  <div className="grid grid-cols-2 w-full h-full gap-2">
                    {/* Product visual */}
                    <div className="relative h-full">
                      <div className="absolute inset-0 py-4 pl-1 sm:p-5">
                        <div className="relative h-full w-full rounded-xl overflow-hidden bg-white">
                          <Image
                            src={
                              product.image
                                ? urlFor(product.image).format("webp").width(600).bg("ffffff").url()
                                : "/placeholder.webp"
                            }
                            alt={product.name || "Product image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            priority={idx === 0}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Meta + CTA rail (compact) */}
                    <div className="flex flex-col justify-between py-5 pr-5 sm:pr-6">
                      <div className="mt-4">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-6">
                          {product.name ?? "Product"}
                        </h3>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-4 sm:mt-6 flex items-end justify-between">
                        <div className="space-y-1">
                          {typeof product.previousPrice === "number" && product.previousPrice > (product.price ?? 0) && (
                            <div className="text-xs text-gray-500 line-through">
                              Tk {product.previousPrice}
                            </div>
                          )}
                          <div className="sm:text-xl font-bold text-theme-primary">
                            Tk {product.price ?? 0}
                          </div>
                        </div>
                        <Link
                          href={`/products/${product.slug?.current ?? product._id}`}
                          className="group inline-flex items-center gap-2 rounded-full bg-theme-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-white transition-colors duration-300 hover:bg-theme-secondary"
                          aria-label={`View ${product.name ?? "product"}`}
                        >
                          View
                          <ArrowRight className="size-3 sm:size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile View-all */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/products?featured=true"
                className="inline-flex items-center gap-2 text-sm font-medium text-theme-primary hover:text-theme-secondary"
              >
                View all featured
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* New Arrivals - Dynamic grid */}
      <section aria-labelledby="latest-heading" className="bg-gradient-to-b from-gray-50 to-white">
        <div className="wrapper">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 id="latest-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {hasFeatured ? "New Arrivals" : "Our Collection"}
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">Fresh products added recently</p>
              </div>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-theme-primary hover:text-theme-secondary group"
            >
              Browse all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {hasLatest ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {latest.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 text-sm">Check back soon for exciting new arrivals!</p>
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-theme-primary hover:text-theme-secondary"
            >
              Browse all products
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* <section className="py-12 sm:py-16 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#0ea5e9]"></section> */}

      {/* CTA Section - Strong visual anchor */}
      <section className="animated-gradient py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to find your perfect product?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Browse our full collection and discover amazing deals
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 bg-white text-theme-primary font-semibold px-8 py-4 rounded-full hover:bg-gray-100 text-sm sm:text-base"
            >
              View All Products
              <ArrowRight className="size-3 sm:size-5 group-hover:translate-x-2 transition-all transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
