import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import useGetArticleCategory from "@/hooks/API/article/GET/useGetArticleCategory";

function ArticleSearchBarSkeleton() {
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

export default function ArticleSearchBar() {
  const { data: categories = [], isLoading: isCategoryLoading } =
    useGetArticleCategory();

  if (isCategoryLoading) return <ArticleSearchBarSkeleton />;

  return (
    <div className="w-full">
      <InputGroup className="mb-4 h-12">
        <InputGroupInput
          placeholder="아티클 검색..."
          // onKeyDown={onSearchKeyDown}
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
              className={`w-fit cursor-pointer border-green-200 px-5 py-2 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50`}
              key={cat.id}
            >
              {cat.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
