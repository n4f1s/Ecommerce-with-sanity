export default function Loading() {
  return (
    <div className="wrapper">
      <div className="animate-pulse">
        {/* Page title */}
        <div className="h-7 w-40 bg-gray-300 rounded mb-4" />

        <div className="lg:grid lg:grid-cols-6 gap-8">
          {/* Left: Cart items */}
          <div className="col-span-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded-2xl flex items-center justify-between lg:max-w-[800px]"
              >
                <div className="flex items-center flex-1 min-w-0">
                  {/* Image */}
                  <div className="size-24 flex-shrink-0 mr-4 rounded bg-gray-300" />

                  {/* Texts */}
                  <div className="min-w-0 space-y-2">
                    <div className="h-5 w-56 bg-gray-300 rounded" />
                    <div className="h-4 w-40 bg-gray-300 rounded" />
                  </div>
                </div>

                {/* Quantity control placeholder */}
                <div className="flex items-center ml-4 flex-shrink-0 gap-2">
                  <div className="h-10 w-24 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order summary */}
          <div className="col-span-2 h-fit bg-white p-6 border rounded-2xl">
            <div className="h-6 w-36 bg-gray-300 rounded" />
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-300 rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-300 rounded" />
                <div className="h-6 w-24 bg-gray-300 rounded" />
              </div>
              <div className="h-11 w-full bg-gray-300 rounded-md mt-3" />
            </div>
          </div>
        </div>

        {/* Address section */}
        <div className="mt-8 w-full">
          <div className="h-6 w-32 bg-gray-300 rounded" />

            <div className="w-full bg-gray-300 h-[1px] my-6" />

          {/* Address form skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column fields */}
            <div className="space-y-4">
              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-11 w-full bg-gray-300 rounded" />

              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-11 w-full bg-gray-300 rounded" />

              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-11 w-full bg-gray-300 rounded" />
            </div>

            {/* Right column fields */}
            <div className="space-y-4">
              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-11 w-full bg-gray-300 rounded" />

              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-11 w-full bg-gray-300 rounded" />

              <div className="h-5 w-28 bg-gray-300 rounded" />
              <div className="h-24 w-full bg-gray-300 rounded" />
            </div>
          </div>

          {/* Submit button skeleton */}
          <div className="h-11 w-44 bg-gray-300 rounded mt-6" />
        </div>
      </div>
    </div>
  );
}
