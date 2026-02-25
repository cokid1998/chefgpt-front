import { CookingPot } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import useGetAllRecipe from "@/hooks/API/recipe/GET/useGetAllRecipe";
import RecipeListSkeleton from "@/components/home/skeleton/RecipeListSkeleton";
import type { RecipeCategoryType } from "@/types/recipeType";

interface RecipeListProps {
  selectCategory: RecipeCategoryType;
  search: string;
}

export default function RecipeList({
  selectCategory,
  search,
}: RecipeListProps) {
  const { data: recipeIds, isLoading: recipeListLoading } = useGetAllRecipe(
    selectCategory.id,
    search,
  );

  if (recipeListLoading) return <RecipeListSkeleton />;

  return (
    <>
      <div>
        <h1 className="mb-6 flex items-center gap-2">
          <CookingPot className="text-green-500" />
          <span className="text-2xl font-bold text-gray-900">
            {selectCategory.name} 레시피
          </span>
          <span className="text-sm text-gray-500">({recipeIds?.length}개)</span>
        </h1>
      </div>

      <div className="grid min-h-[346px] w-full grid-cols-3 gap-6">
        {recipeIds?.map((recipeId) => (
          <RecipeCard recipeId={recipeId} key={recipeId} />
        ))}
      </div>
    </>
  );
}
