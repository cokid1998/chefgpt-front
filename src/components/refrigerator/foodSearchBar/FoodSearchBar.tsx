import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";
import FoodFilterBarSkeleton from "@/components/refrigerator/skeleton/FoodFilterBarSkeleton";
import useListParams from "@/hooks/useListParams";

export const EXPIRATION_INFO = [
  { title: "전체", value: "ALL" },
  { title: "만료", value: "EXPIRE" },
  { title: "임박", value: "IMMINENT" },
  { title: "신선", value: "NORMAL" },
];

export default function FoodSearchBar() {
  const { categoryName, search, params, setParams } = useListParams();
  const expire = params.get("expire") ?? "전체";

  const { data: foodsCategory = [], isLoading: isCategoryLoading } =
    useGetCategory();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams({
        category: categoryName,
        search: e.currentTarget.value,
        expire,
      });
    }
  };

  const handleCategory = (category: string) => {
    setParams({
      category,
      search,
      expire,
    });
  };

  const handleExpire = (expire: string) => {
    setParams({
      category: categoryName,
      search,
      expire,
    });
  };

  if (isCategoryLoading) {
    return <FoodFilterBarSkeleton />;
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <InputGroup className="mb-4 h-12">
        <InputGroupInput
          placeholder="식재료 검색..."
          onKeyDown={handleSearch}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-medium text-gray-500">카테고리</p>
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2">
            {[{ id: 0, name: "전체", icon: "" }, ...foodsCategory]?.map(
              (category) => (
                <Badge
                  key={category.id}
                  variant={"outline"}
                  className={`w-fit cursor-pointer px-3 py-1 text-sm font-medium ${categoryName === category.name ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg" : "border-green-200 text-gray-600 hover:border-green-400 hover:bg-green-50"}`}
                  onClick={() => handleCategory(category.name)}
                >
                  {category.name} {category.icon}
                </Badge>
              ),
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-gray-500">유통기한</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {EXPIRATION_INFO.map((item) => (
              <Badge
                key={item.value}
                variant={"outline"}
                className={`w-fit cursor-pointer px-3 py-1 text-sm font-medium ${item.title === expire ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg" : "border-green-200 text-gray-600 hover:border-green-400 hover:bg-green-50"}`}
                onClick={() => handleExpire(item.title)}
              >
                {item.title}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
