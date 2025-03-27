export default function Loading() {
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-64">
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="h-12 bg-gray-200 rounded mb-6"></div>

          <div className="bg-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-12 bg-gray-300 rounded"></div>
                  ))}
              </div>

              <div className="h-24 bg-gray-300 rounded"></div>

              <div className="pt-4 border-t border-gray-100">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>

                <div className="space-y-3">
                  {Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-12 bg-gray-300 rounded"></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

