export default function RecipeListSkeleton() {
  return (
    <>
      <div>
        <div className="mb-6 flex items-center gap-2">
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="grid min-h-[346px] w-full grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="mb-4 h-40 w-full rounded-lg bg-gray-200" />

            <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />

            <div className="mb-1 h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </>
  );
}
