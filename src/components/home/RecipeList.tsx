import { CookingPot } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import useGetRecipe from "@/hooks/API/recipe/GET/useGetRecipe";
import RecipeListSkeleton from "@/components/home/skeleton/RecipeListSkeleton";

interface RecipeListProps {
  selectCategoryId: number;
  search: string;
}

export default function RecipeList({
  selectCategoryId,
  search,
}: RecipeListProps) {
  const { data: recipeData, isLoading: recipeListLoading } = useGetRecipe(
    selectCategoryId,
    search,
  );

  if (recipeListLoading) return <RecipeListSkeleton />;

  return (
    <>
      <div>
        <h1 className="mb-6 flex items-center gap-2">
          <CookingPot className="text-green-500" />
          <span className="text-2xl font-bold text-gray-900">모든 레시피</span>
          <span className="text-sm text-gray-500">
            ({recipeData?.length}개)
          </span>
        </h1>
      </div>

      <div className="grid min-h-[346px] w-full grid-cols-3 gap-6">
        {recipeData?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
