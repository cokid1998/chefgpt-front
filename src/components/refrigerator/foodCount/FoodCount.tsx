import useGetFoodCount from "@/hooks/API/food/GET/useGetFoodCount";

function FoodCountSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-1 h-4 w-12 animate-pulse rounded bg-gray-200" />

      <div className="h-8 w-16 animate-pulse rounded bg-gray-300" />
    </div>
  );
}

export default function FoodCount() {
  const { data: foodsCount, isLoading: foodsCountLoading } = useGetFoodCount();

  if (foodsCountLoading) {
    return (
      <div className="grid min-h-22.5 grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <FoodCountSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-h-22.5 grid-cols-4 gap-4">
      {foodsCount?.map((count) => (
        <div
          key={count.key}
          className="rounded-2xl border bg-white p-4 shadow-sm"
        >
          <p className="mb-1 text-sm text-gray-500">{count.label}</p>
          <p className="text-2xl font-bold text-gray-900">{count.value}개</p>
        </div>
      ))}
    </div>
  );
}
