export default function RecipeSearchBarSkeleton() {
  return (
    <>
      <div className="mb-6 flex justify-between">
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-md bg-gray-200" />
        <div className="ml-4 h-12 w-36 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="mb-8 flex items-center gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-9.5 w-20 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
    </>
  );
}
