import FoodCard from "@/components/refrigerator/foodList/FoodCard";
import useGetOneFood from "@/hooks/API/food/GET/useGetOneFood";
import type { FoodType } from "@/types/refrigeratorType";
import { Package } from "lucide-react";

function CardSkeleton() {
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
          <CardSkeleton key={i} />
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
