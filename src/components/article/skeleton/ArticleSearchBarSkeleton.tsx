export default function ArticleSearchBarSkeleton() {
  return (
    <div>
      <div className="mb-4 h-12 animate-pulse rounded-lg bg-gray-200" />
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-9.5 w-16.5 shrink-0 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
