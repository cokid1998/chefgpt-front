import { ChefHat } from "lucide-react";
import { Link } from "react-router";
import useGetMyRecipe from "@/hooks/API/recipe/GET/useGetMyRecipe";
import { CREATE_RECIPE, RECIPE_DETAIL } from "@/constants/Url";
import MyInfoRecipeTabSkeleton from "@/components/myInfo/skeleton/MyInfoRecipeTabSkeleton";
import RecipeCard from "@/components/recipe/RecipeCard";

export default function MyInfoRecipeTab() {
  const { data: myRecipeIds, isLoading } = useGetMyRecipe();

  if (isLoading) return <MyInfoRecipeTabSkeleton />;

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex flex-col space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        내가 만든 레시피 ({myRecipeIds?.length}개)
      </div>

      <div className="p-6 pt-0">
        {myRecipeIds?.length === 0 ? (
          <div className="py-12 text-center">
            <ChefHat className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <p className="mb-4 text-gray-500">아직 작성한 레시피가 없습니다</p>

            <Link
              to={CREATE_RECIPE}
              className="text-primary-foreground inline-flex h-9 items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-600"
            >
              레시피 만들기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myRecipeIds?.map((recipeId) => (
              <RecipeCard key={recipeId} recipeId={recipeId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
