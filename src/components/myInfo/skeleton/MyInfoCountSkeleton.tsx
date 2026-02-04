export default function MyInfoCountSkeleton() {
  return (
    <div className="-mt-8 grid w-full grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex h-13 items-center gap-4">
            <div className="size-12 animate-pulse rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
