export default function MyInfoRecipeTabSkeleton() {
  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6 leading-none">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border shadow">
              <div className="relative h-48 animate-pulse bg-gray-200">
                <div className="absolute top-3 left-3 h-6 w-16 rounded-md bg-gray-300" />
              </div>
              <div className="p-4">
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-200" />

                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
