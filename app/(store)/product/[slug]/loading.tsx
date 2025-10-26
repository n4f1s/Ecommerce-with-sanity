export default function Loading() {
  return (
    <div className="wrapper animate-pulse">
      <div className="flex flex-row lg:flex-nowrap flex-wrap gap-8">
        {/* Left: Image gallery skeleton */}
        <div className="w-full lg:w-[340px] h-auto">
          <div className="relative aspect-square w-full rounded-xl bg-gray-300" />
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Middle: Title, stock, content */}
        <div className="lg:w-[580px] flex-1">
          <div className="space-y-4">
            <div className="h-14 w-4/5 rounded bg-gray-300" />
            <div className="h-[1px] w-full bg-gray-300" />
            <div className="h-5 w-18 rounded bg-gray-300" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-[20%] rounded bg-gray-300" />

              {Array.from({ length: 6 }).map((_, i) => (
                <div className="space-y-2" key={i}>
                  <div className="h-4 w-5/6 rounded bg-gray-300" />
                  <div className="h-4 w-2/3 rounded bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Price, qty, buttons */}
        <div className="w-auto min-w-[260px] space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="h-8 w-32 rounded bg-gray-300" />
            <div className="h-5 w-24 rounded bg-gray-300 relative">
              <span className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-400" />
            </div>
            <div className="h-6 w-24 rounded bg-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-5 w-24 rounded bg-gray-300" />
            <div className="h-10 w-28 rounded bg-gray-300" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-11 w-40 rounded-md bg-gray-300" />
            <div className="h-11 w-40 rounded-md bg-gray-400" />
          </div>

          <div className="h-5 w-40 rounded bg-gray-300" />
          <div className="h-4 w-64 rounded bg-gray-300" />
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-gray-100 mt-10 py-8 px-6 rounded">
        <div className="flex flex-wrap gap-5 sm:gap-8 justify-center items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center sm:w-[300px]">
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-gray-300" />
                <div className="h-4 w-56 rounded bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mt-8">
        <div className="flex gap-4">
          <div className="h-9 w-28 rounded-t bg-gray-100" />
          <div className="h-9 w-28 rounded-t bg-gray-100" />
          <div className="h-9 w-28 rounded-t bg-gray-100" />
        </div>
        <div className="p-6 space-y-3">
          <div className="h-4 w-5/6 rounded bg-gray-300" />
          <div className="h-4 w-2/3 rounded bg-gray-300" />
          <div className="h-4 w-4/6 rounded bg-gray-300" />
          <div className="h-64 w-full rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
