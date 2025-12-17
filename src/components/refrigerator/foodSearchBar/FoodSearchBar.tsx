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
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCategoryClick: (category: string) => void;
}

export default function FoodSearchBar({
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
        {[{ id: 0, name: "전체" }, ...foodsCategory]?.map((category) => (
          <Badge
            key={category.id}
            variant={"outline"}
            className="w-14 cursor-pointer border-green-200 px-3 py-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50"
            onClick={() => onCategoryClick(category.name)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
