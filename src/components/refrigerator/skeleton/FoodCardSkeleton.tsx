export default function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mb-3 h-7 w-24 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="text-md space-y-2 text-gray-500">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
