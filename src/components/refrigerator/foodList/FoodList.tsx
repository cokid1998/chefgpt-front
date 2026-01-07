import FoodCard from "@/components/refrigerator/foodList/FoodCard";
import { Package } from "lucide-react";
import FoodCountSkeleton from "@/components/refrigerator/skeleton/FoodCountSkeleton";

interface FoodListProps {
  // foods: FoodType[];
  foodIds: number[];
  isFoodsLoading: boolean;
}

export default function FoodList({ foodIds, isFoodsLoading }: FoodListProps) {
  if (isFoodsLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <FoodCountSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (foodIds.length === 0) {
    return (
      <div className="rounded-2xl border border-green-100 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Package className="h-10 w-10 text-green-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          식재료가 없습니다
        </h3>
        <p className="text-gray-500">냉장고에 있는 식재료를 추가해보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {foodIds.map((foodId) => (
        <FoodCard key={foodId} foodId={foodId} />
      ))}
    </div>
  );
}
