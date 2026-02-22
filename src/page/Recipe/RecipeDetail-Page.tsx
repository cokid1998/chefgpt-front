import RecipeStepSlide from "@/components/recipe/RecipeStepSlide/RecipeStepSlide";
import RecipeDetailNavigate from "@/components/recipe/RecipeDetailNavigate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useGetOneRecipe from "@/hooks/API/recipe/GET/useGetOneRecipe";

export default function RecipeDetailPage() {
  const nav = useNavigate();
  const { recipeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  const { data: recipe, isLoading } = useGetOneRecipe(Number(recipeId));

  if (!recipe?.recipeSteps) return null;

  return (
    <div className="bg-soft-green h-full">
      <div className="sticky top-0 z-10 flex h-24 items-center justify-between border-b bg-white px-10">
        <Button
          variant="outline"
          onClick={() => nav(-1)}
          className="text-gray-700 hover:bg-green-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          돌아가기
        </Button>

        <h1 className="text-3xl text-gray-700">{recipe?.title}</h1>

        <div className="flex items-center gap-3">
          <Button
            // onClick={() => setShowIngredients(!showIngredients)}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            재료 보기
          </Button>

          <Button
            variant="outline"
            // onClick={() => likeMutation.mutate()}
            className="border-green-200 text-gray-700 hover:bg-green-50"
          >
            <Heart className="mr-2 h-5 w-5" />0
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <RecipeStepSlide
          step={recipe?.recipeSteps?.[currentStep - 1]}
          currentStep={currentStep}
          thumbnailUrl={recipe.thumbnailUrl}
          className="bg-white shadow-lg"
        />

        <RecipeDetailNavigate
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalLength={recipe?.recipeSteps.length}
        />
      </div>
    </div>
  );
}
