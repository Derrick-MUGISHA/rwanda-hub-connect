export default function Loading() {
  return (
    <div className="container py-12">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>

        <div className="h-12 bg-gray-200 rounded mb-8 mx-auto w-96"></div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
        </div>
      </div>
    </div>
  )
}

