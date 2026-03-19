export default function ArticleCardSkeleton() {
  return (
    <div className="group rounded-xl border border-green-100 bg-white p-4 shadow">
      <div className="mb-3 h-5.5 w-20 animate-pulse rounded-md bg-gray-200" />

      <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-gray-200" />

      <div className="mb-4 h-5 w-full animate-pulse rounded bg-gray-200" />

      <div className="flex items-center justify-between">
        <div className="flex h-5 items-center gap-3">
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
