export default function VoteCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        </div>
        <div className="ml-4 h-8 w-20 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-100" />

      <div className="mb-4 space-y-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="relative h-16 w-full animate-pulse rounded-xl border-2 border-gray-200 bg-gray-100"
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
