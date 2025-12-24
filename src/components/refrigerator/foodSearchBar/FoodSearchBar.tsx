import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";

function FilterBarSkeleton() {
  return (
    <div className="rounded-2xl border p-6 shadow-sm">
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

interface FoodSearchBarProps {
  selectCategory: string;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCategoryClick: (category: string) => void;
}
/**
 * Todo: 필터링 목록에 유통기한 종류도 추가해야함
 */
export default function FoodSearchBar({
  selectCategory,
  onSearchKeyDown,
  onCategoryClick,
}: FoodSearchBarProps) {
  const { data: foodsCategory = [], isLoading: isCategoryLoading } =
    useGetCategory();

  if (isCategoryLoading) {
    return <FilterBarSkeleton />;
  }

  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <InputGroup className="mb-4 h-12">
        <InputGroupInput
          placeholder="식재료 검색..."
          onKeyDown={onSearchKeyDown}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[{ id: 0, name: "전체", icon: "" }, ...foodsCategory]?.map(
          (category) => (
            <Badge
              key={category.id}
              variant={"outline"}
              className={`w-fit cursor-pointer px-3 py-1 text-sm font-medium ${selectCategory === category.name ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg" : "border-green-200 text-gray-600 hover:border-green-400 hover:bg-green-50"}`}
              onClick={() => onCategoryClick(category.name)}
            >
              {category.name} {category.icon}
            </Badge>
          ),
        )}
      </div>
    </div>
  );
}
