export default function FoodFilterBarSkeleton() {
  return (
    <div className="h-[250px] rounded-2xl border bg-white p-6 shadow-sm md:min-w-[742px]">
      <div className="mb-4 h-12 animate-pulse rounded-lg bg-gray-200" />

      <div className="space-y-3">
        <div>
          <div className="mb-2 h-3 w-12 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2 overflow-hidden pb-2">
            {[52, 68, 56, 72, 60].map((w, i) => (
              <div
                key={i}
                className="h-7 shrink-0 animate-pulse rounded-full bg-gray-200"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 h-3 w-10 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2 overflow-hidden pb-2">
            {[52, 64, 58, 70].map((w, i) => (
              <div
                key={i}
                className="h-7 shrink-0 animate-pulse rounded-full bg-gray-200"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
