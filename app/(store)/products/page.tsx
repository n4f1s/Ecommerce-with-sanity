import { Suspense } from 'react'
import Filters, { MobileTrigger, ActiveChips } from '@/components/product/Filters'
import ProductCard from '@/components/product/ProductCard'
import type { Product, Category } from '@/sanity.types'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import BreadcrumbsBar from '@/components/layout/Breadcrumb'
import Link from 'next/link'

// Cache policy for the whole route (tune as needed)
export const revalidate = 120

const PAGE_SIZE = 16

type SP = Promise<Record<string, string | string[] | undefined>>

// Normalizers to keep types tight and URLs consistent
const toStr = (v: string | string[] | undefined): string | undefined =>
    Array.isArray(v) ? v[0] : v

const toStrArr = (v: string | string[] | undefined): string[] =>
    Array.isArray(v) ? v : v ? [v] : []

const toPage = (v: string | string[] | undefined): number => {
    const raw = Array.isArray(v) ? v[0] : v
    const n = raw ? parseInt(raw, 10) : 1
    return Number.isFinite(n) && n > 0 ? n : 1
}

// Categories (cached strongly; separate tag for targeted revalidation)
async function getAllCategoriesCached(): Promise<Category[]> {
    const CATEGORIES_Q = defineQuery(`*[_type=="category"] | order(title asc){
    _id, _type, _createdAt, _updatedAt, _rev, title, slug, description
  }`)
    const res = await sanityFetch({
        query: CATEGORIES_Q,
        params: {},
    })
    return res.data ?? []
}

// Single GROQ (filters + pagination + total) with caching and tags
async function getFilteredProductsPaginated(input: {
    categories: string[]
    min?: string
    max?: string
    page: number
    pageSize: number
}): Promise<{ items: Product[]; total: number }> {
    const { categories, min, max, page, pageSize } = input
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const FILTERED_QUERY = defineQuery(`
    {
      "items": *[
        _type == "product" &&
        (
          !defined($categories) || count((categories[]->slug.current)[@ in $categories]) > 0
        ) &&
        (
          (!defined($min) || price >= $min) && (!defined($max) || price <= $max)
        )
      ] | order(name asc) [$start...$end],
      "total": count(*[
        _type == "product" &&
        (
          !defined($categories) || count((categories[]->slug.current)[@ in $categories]) > 0
        ) &&
        (
          (!defined($min) || price >= $min) && (!defined($max) || price <= $max)
        )
      ])
    }
  `)

    const params = {
        categories: categories.length ? categories : null,
        min: min ? Number(min) : null,
        max: max ? Number(max) : null,
        start,
        end,
    }

    const res = await sanityFetch({
        query: FILTERED_QUERY,
        params,
    })

    return res.data ?? { items: [], total: 0 }
}

function ProductGridSkeleton() {
    return (
        <>
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-muted rounded-lg aspect-square" />
            ))}
        </>
    )
}

async function ProductGrid({ searchParams }: { searchParams: SP }) {
    const sp = await searchParams
    const page = toPage(sp.page)
    const categories = toStrArr(sp.category)
    const min = toStr(sp.min)
    const max = toStr(sp.max)

    const { items } = await getFilteredProductsPaginated({
        categories,
        min,
        max,
        page,
        pageSize: PAGE_SIZE,
    })

    if (items.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="max-w-md">
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                        Try changing or clearing your filters to see more products.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center rounded-md bg-theme-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-theme-secondary transition-colors"
                    >
                        Clear all filters
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            {items.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </>
    )
}

function Pagination({ total, page }: { total: number; page: number }) {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
    if (totalPages <= 1) return null

    const pages: number[] = []
    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages, page + 1)
    for (let p = start; p <= end; p++) pages.push(p)

    const buildURL = (target: number) => {
        const url =
            typeof window !== 'undefined'
                ? new URL(window.location.href)
                : new URL('http://localhost')
        const sp = url.searchParams
        sp.set('page', String(target))
        return `?${sp.toString()}`
    }

    return (
        <nav className="mt-8 flex items-center justify-between" aria-label="Pagination">
            <a
                href={page > 1 ? buildURL(page - 1) : '#'}
                aria-disabled={page <= 1}
                className={`inline-flex items-center rounded-md border px-3 py-2 text-sm ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-accent'
                    }`}
                rel="prev"
            >
                Previous
            </a>

            <div className="flex items-center gap-2">
                {start > 1 && (
                    <>
                        <a
                            href={buildURL(1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm hover:bg-accent"
                        >
                            1
                        </a>
                        {start > 2 && <span className="px-1 text-muted-foreground">…</span>}
                    </>
                )}
                {pages.map((p) => (
                    <a
                        key={p}
                        href={buildURL(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm ${p === page ? 'bg-theme-primary text-white border-theme-primary' : 'hover:bg-accent'
                            }`}
                    >
                        {p}
                    </a>
                ))}
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && <span className="px-1 text-muted-foreground">…</span>}
                        <a
                            href={buildURL(totalPages)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm hover:bg-accent"
                        >
                            {totalPages}
                        </a>
                    </>
                )}
            </div>

            <a
                href={page < totalPages ? buildURL(page + 1) : '#'}
                aria-disabled={page >= totalPages}
                className={`inline-flex items-center rounded-md border px-3 py-2 text-sm ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-accent'
                    }`}
                rel="next"
            >
                Next
            </a>
        </nav>
    )
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: SP
}) {
    const sp = await searchParams
    const page = toPage(sp.page)

    // Categories: cached strongly with separate tag
    const categories = await getAllCategoriesCached()

    // Get total with same filters (cached with products tag)
    const { total } = await getFilteredProductsPaginated({
        categories: toStrArr(sp.category),
        min: toStr(sp.min),
        max: toStr(sp.max),
        page,
        pageSize: PAGE_SIZE,
    })

    const hasFilters = Object.keys(sp).some((k) => k !== 'page')

    return (
        <>
            <BreadcrumbsBar />

            <div className="sm:px-16 px-4 pt-4 pb-10 sm:pb-16 max-w-[1500px] w-full h-full mx-auto relative">
                <div className="mb-6 lg:mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">All Products</h1>
                    <p className="text-muted-foreground mt-2">Browse our complete collection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 lg:gap-8">
                    {/* Desktop sidebar */}
                    <aside className="hidden md:block">
                        <div className="sticky top-24 space-y-6">
                            <Filters initialState={sp} categories={categories} />
                        </div>
                    </aside>

                    {/* Main */}
                    <section aria-label="Products">
                        {/* Mobile trigger */}
                        <div className="md:hidden mb-4">
                            <MobileTrigger categories={categories} />
                        </div>

                        {/* Active chips */}
                        {hasFilters && (
                            <div className="mb-6">
                                <ActiveChips className="gap-2" />
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4">
                            <Suspense fallback={<ProductGridSkeleton />}>
                                <ProductGrid searchParams={searchParams} />
                            </Suspense>
                        </div>

                        {/* Pagination */}
                        <Pagination total={total} page={page} />
                    </section>
                </div>
            </div>
        </>
    )
}
