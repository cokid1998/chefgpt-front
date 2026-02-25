import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChefHat,
  Trophy,
  Settings,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import youtubeDefaultImage from "@/assets/image/youtube_default.jpg";
import useGetMyRecipe from "@/hooks/API/recipe/GET/useGetMyRecipe";
import { RECIPE_DETAIL } from "@/constants/Url";
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
        {/* {recipes.length === 0 ? (
            <div className="py-12 text-center">
              <ChefHat className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="mb-4 text-gray-500">
                아직 작성한 레시피가 없습니다
              </p>
              <Button className="bg-green-500 hover:bg-green-600">
                레시피 만들기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )} */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myRecipeIds?.map((recipeId) => (
            <RecipeCard recipeId={recipeId} key={recipeId} />
          ))}
        </div>
      </div>
    </div>
  );
}
