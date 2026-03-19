export default function VoteCardSkeleton() {
  return (
    <div className="h-50 rounded-xl border border-gray-200 bg-white p-3 shadow md:h-77.5 md:p-6">
      <div className="mb-3 flex items-start justify-between md:mb-4">
        <div className="flex-1">
          <div className="mb-1 h-5 w-3/4 animate-pulse rounded bg-gray-200 md:mb-2 md:h-6" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        </div>
        <div className="ml-4 h-8 w-20 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="mb-4 space-y-2 md:space-y-3">
        <div className="relative h-10.5 w-full animate-pulse rounded-xl border-2 border-gray-200 bg-gray-100 md:h-16" />
        <div className="relative h-10.5 w-full animate-pulse rounded-xl border-2 border-gray-200 bg-gray-100 md:h-16" />
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
