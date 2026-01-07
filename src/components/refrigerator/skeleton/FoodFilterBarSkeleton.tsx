export default function FoodFilterBarSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 h-12 animate-pulse rounded-lg bg-gray-200" />
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-14 shrink-0 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
