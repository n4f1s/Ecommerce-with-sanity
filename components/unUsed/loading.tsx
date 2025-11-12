
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-muted ${className}`} aria-hidden="true" />
}

export default function Loading() {
  return (
    <div className="wrapper" aria-busy="true" aria-live="polite">
      {/* Header skeleton */}
      <div className="mb-6 lg:mb-8">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-72 mt-2 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* Sidebar filters skeleton */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6" role="region" aria-label="Filters loading">
            <div className="space-y-3 border-b border-border pb-4">
              <Skeleton className="h-5 w-24 rounded" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>
            </div>

            <div className="space-y-3 border-b border-border pb-4">
              <Skeleton className="h-5 w-28 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-full rounded" />
                <Skeleton className="h-9 w-full rounded" />
              </div>
              <Skeleton className="h-9 w-full rounded" />
            </div>

            <Skeleton className="h-10 w-full rounded" />
          </div>
        </aside>

        {/* Main content skeleton */}
        <section aria-label="Products loading">
          {/* Mobile filter trigger bar */}
          <div className="lg:hidden mb-4">
            <Skeleton className="h-10 w-full rounded" />
          </div>

          {/* Active chips row */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          {/* Product grid skeleton cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-8 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="mt-8 flex items-center justify-between">
            <Skeleton className="h-9 w-24 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-9 w-9 rounded" />
            </div>
            <Skeleton className="h-9 w-24 rounded" />
          </div>
        </section>
      </div>
    </div>
  )
}
