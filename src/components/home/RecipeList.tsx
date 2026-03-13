import { CookingPot } from "lucide-react";
import RecipeCard from "@/components/recipe/RecipeCard";
import useGetAllRecipe from "@/hooks/API/recipe/GET/useGetAllRecipe";
import RecipeListSkeleton from "@/components/home/skeleton/RecipeListSkeleton";
import { useSearchParams } from "react-router";
import useGetRecipeCategory from "@/hooks/API/recipe/GET/useGetRecipeCategory";

export default function RecipeList() {
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);

  const { data: categories = [] } = useGetRecipeCategory();
  const categoryId =
    categories.find((cate) => cate.name === categoryName)?.id ?? 0;

  const { data: recipeData, isLoading: recipeListLoading } = useGetAllRecipe(
    categoryId,
    search,
    page,
  );

  if (recipeListLoading) return <RecipeListSkeleton />;

  return (
    <>
      <div>
        <h1 className="mb-6 flex items-center gap-2">
          <CookingPot className="text-green-500" />
          <span className="text-2xl font-bold text-gray-900">
            {categoryName} 레시피
          </span>
          <span className="text-sm text-gray-500">
            ({recipeData?.recipeIds?.length}개)
          </span>
        </h1>
      </div>

      <div className="grid min-h-[346px] w-full grid-cols-1 gap-6 md:grid-cols-3">
        {recipeData?.recipeIds.length === 0 ? (
          <div className="col-span-1 flex flex-col items-center justify-center gap-2 text-gray-400 md:col-span-3">
            <CookingPot size={48} />
            <p className="text-lg font-medium">등록된 레시피가 없습니다</p>
          </div>
        ) : (
          recipeData?.recipeIds.map((recipeId) => (
            <RecipeCard recipeId={recipeId} key={recipeId} />
          ))
        )}
      </div>
    </>
  );
}
