"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Crumb = { href: string; label: string; isLast: boolean }

export default function BreadcrumbsBar() {
  const pathname = usePathname() || "/"

  const crumbs: Crumb[] = useMemo(() => {
    const parts = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)
    const list: Crumb[] = []
    let href = ""

    // Home
    list.push({ href: "/", label: "Home", isLast: parts.length === 0 })

    parts.forEach((seg, i) => {
      href += `/${seg}`
      const label = decodeURIComponent(seg)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
      list.push({ href, label, isLast: i === parts.length - 1 })
    })

    // Hide sole Home on root
    if (list.length === 1 && list[0].href === "/") return []
    return list
  }, [pathname])

  const jsonLd = useMemo(() => {
    if (!crumbs.length) return null
    const items = crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: { "@id": c.href, name: c.label },
    }))
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    }
  }, [crumbs])

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-white">
      <div className="sm:px-16 px-4 py-4 sm:py-4 max-w-[1500px] w-full h-full mx-auto relative">
        <ol className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm text-gray-600">
          {crumbs.map((c, i) => (
            <li key={`${c.href}-${i}`} className="group flex items-center min-w-0">
              {c.isLast ? (
                <span
                  aria-current="page"
                  className="max-w-[40vw] sm:max-w-none truncate text-gray-400 font-medium"
                  title={c.label}
                >
                  {c.label}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="inline-flex max-w-[28vw] sm:max-w-none items-center rounded px-1 py-0.5 text-black hover:text-white hover:bg-theme-primary transition-all duration-200"
                  title={c.label}
                >
                  {c.label}
                </Link>
              )}

              {i < crumbs.length - 1 && (
                <span className="mx-1 sm:mx-1.5 text-gray-300 group-last:hidden" aria-hidden="true">
                  <ChevronRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-gray-400" strokeWidth={2} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </nav>
  )
}
