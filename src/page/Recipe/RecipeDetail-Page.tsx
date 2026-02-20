import RecipeIntro from "@/components/recipe/RecipeIntro/RecipeIntro";
import RecipeStepSlide from "@/components/recipe/RecipeStepSlide/RecipeStepSlide";
import { Separator } from "@/components/ui/separator";
import RecipeModalNavigate from "@/components/recipe/RecipeModalNavigate";
import { useState } from "react";
import useGetMyRecipe from "@/hooks/API/recipe/GET/useGetMyRecipe";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export default function RecipeDetailPage() {
  const nav = useNavigate();
  const [currentStep, setCurrentStep] = useState();

  return (
    <div className="bg-soft-green h-full">
      <div className="sticky top-0 z-10 flex h-24 items-center justify-between border-b bg-white px-10">
        <Button
          variant="outline"
          onClick={() => nav(-1)}
          className="border-green-200 text-gray-700 hover:bg-green-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          돌아가기
        </Button>

        <h1 className="text-3xl text-gray-700">스파게티 알리오 올리오</h1>

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

      {/* {currentStep === 0 && (
        <RecipeIntro
          youtubeUrl={youtubeUrl}
          checkedIngredient={checkedIngredient}
          setCheckedIngredient={setCheckedIngredient}
          accordionValue={accordionValue}
          setAccordionValue={setAccordionValue}
          recipeInfo={recipeInfo}
        />
      )}
      {currentStep !== 0 && (
        <RecipeStepSlide
          step={recipeInfo.steps[currentStep - 1]}
          currentStep={currentStep}
          youtubeUrl={youtubeUrl}
        />
      )}

      <Separator className="my-4 w-full" />

      <RecipeModalNavigate
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalLength={recipeInfo.steps.length}
      /> */}
    </div>
  );
}
