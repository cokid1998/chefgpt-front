import RecipeStepSlide from "@/components/recipe/RecipeStepSlide/RecipeStepSlide";
import RecipeDetailNavigate from "@/components/recipe/RecipeDetailNavigate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useGetOneRecipe from "@/hooks/API/recipe/GET/useGetOneRecipe";
import { useOpenModal } from "@/store/modalStore";
import IngredientViewModal from "@/components/modal/recipe/IngredientViewModal";
import usePostToggleLike from "@/hooks/API/recipe/POST/userPostToggleLike";

export default function RecipeDetailPage() {
  const nav = useNavigate();
  const openModal = useOpenModal();
  const { recipeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  const { data: recipe, isLoading } = useGetOneRecipe(Number(recipeId));
  const { mutate: likeToggle } = usePostToggleLike();

  // Todo: Skeleton 처리
  if (!recipe?.recipeSteps || isLoading) return null;

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
            onClick={() =>
              openModal(
                <IngredientViewModal ingredients={recipe.recipeIngredients} />,
              )
            }
            className="bg-green-500 text-white hover:bg-green-600"
          >
            재료 보기
          </Button>

          <Button
            variant="outline"
            onClick={() => likeToggle(Number(recipeId))}
            className={`border ${
              recipe?.liked
                ? "border-red-200 text-red-500 hover:bg-red-50"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Heart
              className={`mr-2 h-5 w-5 ${recipe?.liked ? "fill-red-500 stroke-red-500" : ""}`}
            />
            {recipe?.likeCount}
          </Button>

          <div className="flex h-9 items-center gap-2 rounded-md border px-4 py-2">
            <Eye size={16} />
            {recipe?.viewCount}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <RecipeStepSlide
          step={recipe?.recipeSteps?.[currentStep - 1]}
          currentStep={currentStep}
          thumbnailUrl={recipe.thumbnailUrl}
          className="bg-white shadow-lg"
          recipeSource={recipe.recipeSource}
          youtubeId={recipe.youtubeVideoId}
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
