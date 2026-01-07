export default function ArticleCardSkeleton() {
  return (
    <div className="group rounded-xl border border-green-100 bg-white p-6 shadow">
      {/* Badge skeleton */}
      <div className="mb-3 h-6 w-20 animate-pulse rounded-md bg-gray-200" />

      {/* Title skeleton */}
      <div className="mb-2 space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Summary skeleton */}
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Footer info skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="flex items-center gap-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="h-3 w-3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
