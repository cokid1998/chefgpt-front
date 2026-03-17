import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import useGetArticleCategory from "@/hooks/API/article/GET/useGetArticleCategory";
import ArticleSearchBarSkeleton from "@/components/article/skeleton/ArticleSearchBarSkeleton";
import useListParams from "@/hooks/useListParams";

export default function ArticleSearchBar() {
  const { categoryName, search, setParams } = useListParams();
  const { data: categories = [], isLoading: isCategoryLoading } =
    useGetArticleCategory();

  const handleCategoryClick = (category: string) => {
    setParams({
      category: category,
      search,
      page: "1",
    });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams({
        category: categoryName,
        search: e.currentTarget.value,
        page: "1",
      });
    }
  };

  if (isCategoryLoading) return <ArticleSearchBarSkeleton />;

  return (
    <div className="w-full">
      <InputGroup className="mb-4 h-12 bg-white">
        <InputGroupInput
          placeholder="아티클 검색..."
          onKeyDown={handleSearchKeyDown}
          className="w-full"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[{ id: 0, name: "전체" }, ...categories]?.map((cat) => {
          return (
            <Badge
              variant={"outline"}
              className={`w-fit cursor-pointer border-green-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50 ${categoryName === cat.name ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg" : "border-green-200 text-gray-600 hover:border-green-400 hover:bg-green-50"}`}
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
            >
              {cat.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
