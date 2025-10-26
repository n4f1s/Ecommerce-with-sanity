export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="wrapper w-full">
        <div className="bg-white rounded-lg shadow-md py-8 px-4">
          {/* Title */}
          <div className="animate-pulse">
            <div className="mx-auto h-8 w-80 bg-gray-300 rounded mb-6" />

            {/* Category filter row (chips / select / sort) */}
            <div className="h-9 w-52 bg-gray-300 rounded mb-6" />

            {/* Grid of product cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="border rounded-xl overflow-hidden bg-white"
                >
                  {/* Image */}
                  <div className="aspect-square w-full bg-gray-300" />

                  {/* Content */}
                  <div className="p-3 space-y-2">
                    <div className="h-5 w-4/5 bg-gray-300 rounded" />
                    <div className="h-4 w-2/3 bg-gray-300 rounded" />
                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-6 w-20 bg-gray-300 rounded" />
                      <div className="h-6 w-12 bg-gray-400 rounded" />
                    </div>
                    <div className="mt-2 h-9 w-full bg-gray-300 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
