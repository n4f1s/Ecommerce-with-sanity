// components/Filters.tsx
"use client"

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Category } from "@/sanity.types"

type FiltersProps = {
  initialState: Record<string, string | string[] | undefined>
  categories: Category[]
  onApply?: () => void
  onClear?: () => void
}

type FilterState = {
  category: string[]
  min: string
  max: string
}

export type FiltersHandle = {
  apply: () => void
  clear: () => void
}

const FiltersRoot = forwardRef<FiltersHandle, FiltersProps>(function FiltersRoot(
  { initialState, categories, onApply, onClear },
  ref
) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const [local, setLocal] = useState<FilterState>({
    category: Array.isArray(initialState.category)
      ? (initialState.category as string[])
      : initialState.category
      ? [initialState.category as string]
      : [],
    min: (initialState.min as string) ?? "",
    max: (initialState.max as string) ?? "",
  })

  useEffect(() => {
    setLocal({
      category: params.getAll("category"),
      min: params.get("min") ?? "",
      max: params.get("max") ?? "",
    })
  }, [params])

  const doApply = () => {
    const sp = new URLSearchParams()
    local.category.forEach((c) => sp.append("category", c))
    if (local.min) sp.set("min", local.min)
    if (local.max) sp.set("max", local.max)
    router.replace(`${pathname}?${sp.toString()}`)
    onApply?.()
  }

  const doClear = () => {
    setLocal({ category: [], min: "", max: "" })
    router.replace(pathname)
    onClear?.()
  }

  useImperativeHandle(
    ref,
    () => ({
      apply: doApply,
      clear: doClear,
    }),
    [local, pathname, router, onApply, onClear]
  )

  const toggleCategory = (slug: string) => {
    setLocal((prev) => ({
      ...prev,
      category: prev.category.includes(slug)
        ? prev.category.filter((c) => c !== slug)
        : [...prev.category, slug],
    }))
  }

  const hasActive = local.category.length > 0 || local.min !== "" || local.max !== ""

  const categoryList = useMemo(() => {
    return [...categories].sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""))
  }, [categories])

  return (
    <div className="space-y-6" aria-labelledby="filters-title">
      <div className="flex items-center justify-between">
        <h2 id="filters-title" className="text-lg font-semibold">
          Filters
        </h2>
        {hasActive && (
          <Button variant="ghost" size="sm" onClick={doClear} className="text-sm h-8 cursor-pointer">
            Clear all
          </Button>
        )}
      </div>

      <Section title="Category" id="f-cat" defaultOpen>
        <fieldset className="space-y-3">
          <legend className="sr-only">Filter by category</legend>
          {categoryList.map((cat) => {
            const slug = cat.slug?.current ?? ""
            if (!slug) return null
            const checked = local.category.includes(slug)
            return (
              <div key={cat._id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${slug}`}
                  checked={checked}
                  onCheckedChange={() => toggleCategory(slug)}
                  aria-label={`Filter by ${cat.title ?? slug}`}
                />
                <Label htmlFor={`cat-${slug}`} className="text-sm font-normal cursor-pointer">
                  {cat.title ?? slug}
                </Label>
              </div>
            )
          })}
        </fieldset>
      </Section>

      <Section title="Price Range" id="f-price" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label htmlFor="min-price" className="sr-only">
                Minimum price
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="Min"
                inputMode="numeric"
                min="0"
                step="0.01"
                value={local.min}
                onChange={(e) => setLocal((v) => ({ ...v, min: e.target.value }))}
                className="h-9"
              />
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex-1">
              <Label htmlFor="max-price" className="sr-only">
                Maximum price
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="Max"
                inputMode="numeric"
                min="0"
                step="0.01"
                value={local.max}
                onChange={(e) => setLocal((v) => ({ ...v, max: e.target.value }))}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Desktop apply */}
      <div className="hidden sm:block pt-2">
        <Button onClick={doApply} className="w-full bg-theme-primary hover:bg-theme-secondary">
          Apply Filters
        </Button>
      </div>
    </div>
  )
})

type SectionProps = {
  title: string
  id: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function Section({ title, id, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        className="flex w-full items-center justify-between py-2 text-left hover:text-theme-primary transition-colors"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm font-medium">{title}</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <div id={id} hidden={!open} className="mt-3" aria-hidden={!open}>
        {children}
      </div>
    </div>
  )
}

const MobileTriggerImpl: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const innerRef = useRef<FiltersHandle | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <style jsx global>{`
        @keyframes slideInRightFilters {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-center gap-2"
          onClick={() => setOpen(true)}
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title" className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-[300px] bg-background shadow-2xl flex flex-col"
            style={{ transform: "translateX(100%)", animation: "slideInRightFilters 280ms ease-out forwards" }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <h2 id="mobile-filters-title" className="text-lg font-semibold">
                Filters
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
              <FiltersRoot
                ref={innerRef}
                initialState={Object.fromEntries(params)}
                categories={categories}
                onApply={() => setOpen(false)}
                onClear={() => setOpen(false)}
              />
            </div>

            <div className="sticky bottom-0 border-t border-border bg-background p-4 flex gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
              <Button variant="outline" className="flex-1" onClick={() => innerRef.current?.clear()}>
                Clear
              </Button>
              <Button className="flex-1 bg-theme-primary hover:bg-theme-secondary" onClick={() => innerRef.current?.apply()}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const ActiveChipsImpl: React.FC<{ className?: string }> = ({ className = "" }) => {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const chips: Array<{ key: "category" | "price"; value: string; label: string }> = []

  params.getAll("category").forEach((slug) => {
    chips.push({ key: "category", value: slug, label: slug })
  })

  const min = params.get("min")
  const max = params.get("max")
  if (min || max) {
    const label = min && max ? `Price: $${min}–$${max}` : min ? `From $${min}` : `Up to $${max}`
    chips.push({ key: "price", value: "", label })
  }

  const remove = (chip: { key: "category" | "price"; value: string }) => {
    const sp = new URLSearchParams(params.toString())
    if (chip.key === "price") {
      sp.delete("min")
      sp.delete("max")
    } else {
      const all = sp.getAll("category").filter((v) => v !== chip.value)
      sp.delete("category")
      all.forEach((v) => sp.append("category", v))
    }
    router.replace(`${pathname}?${sp.toString()}`)
  }

  if (chips.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="region" aria-label="Active filters">
      <span className="text-sm text-muted-foreground self-center">Active filters:</span>
      {chips.map((chip, i) => (
        <button
          key={`${chip.key}-${chip.value}-${i}`}
          type="button"
          onClick={() => remove(chip)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20 transition-colors border border-theme-primary/20"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  )
}

type FiltersComposite = React.FC<FiltersProps & React.RefAttributes<FiltersHandle>> & {
  MobileTrigger: React.FC<{ categories: Category[] }>
  ActiveChips: React.FC<{ className?: string }>
}

const Filters = Object.assign(FiltersRoot, {
  MobileTrigger: MobileTriggerImpl,
  ActiveChips: ActiveChipsImpl,
}) as FiltersComposite

export default Filters
export const MobileTrigger = MobileTriggerImpl
export const ActiveChips = ActiveChipsImpl
