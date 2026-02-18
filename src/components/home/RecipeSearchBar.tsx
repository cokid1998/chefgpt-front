import { Badge } from "@/components/ui/badge";
import { SearchIcon, Plus } from "lucide-react";
import { Link } from "react-router";
import { CREATE_RECIPE } from "@/constants/Url";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useGetRecipeCategory from "@/hooks/API/recipe/GET/useGetRecipeCategory";
import RecipeSearchBarSkeleton from "@/components/home/skeleton/RecipeSearchBarSkeleton";
import type { RecipeCategoryType } from "@/types/recipeType";

interface RecipeSearchBarProps {
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onCategoryClick: (categoryInfo: RecipeCategoryType) => void;
  selectCategory: RecipeCategoryType;
}

export default function RecipeSearchBar({
  onSearchKeyDown,
  onCategoryClick,
  selectCategory,
}: RecipeSearchBarProps) {
  const { data: categories = [], isLoading: isCategoryLoading } =
    useGetRecipeCategory();

  if (isCategoryLoading) return <RecipeSearchBarSkeleton />;

  return (
    <>
      <div className="mb-6 flex justify-between gap-10">
        <InputGroup className="h-12 bg-white">
          <InputGroupInput
            placeholder="레시피 검색..."
            onKeyDown={onSearchKeyDown}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <Button className="bg-green-gradient h-12" asChild>
          <Link to={CREATE_RECIPE}>
            <Plus />
            레시피 생성
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex items-center gap-3 text-sm font-medium text-gray-600">
        {[{ id: 0, name: "전체" }, ...categories]?.map((category) => (
          <Badge
            key={category.id}
            className={`cursor-pointer bg-white px-5 py-2 text-sm font-medium text-gray-600 ${
              selectCategory.id === category.id
                ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg"
                : "border-green-200 hover:border-green-400 hover:bg-green-50"
            }`}
            onClick={() => onCategoryClick(category)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* <RecipeSearchBarSkeleton /> */}
    </>
  );
}
