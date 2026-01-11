export default function NewsSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow overflow-hidden animate-pulse"
          >
            {/* Image */}
            <div className="h-48 bg-gray-200"></div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>

              <div className="flex justify-between mt-6">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
