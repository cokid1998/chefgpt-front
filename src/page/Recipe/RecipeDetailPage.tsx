import RecipeIntro from "@/components/recipe/RecipeIntro/RecipeIntro";
import RecipeStepSlide from "@/components/recipe/RecipeStepSlide/RecipeStepSlide";
import { Separator } from "@/components/ui/separator";
import RecipeModalNavigate from "@/components/recipe/RecipeModalNavigate";
import { useState } from "react";
import useGetRecipe from "@/hooks/API/recipe/useGetRecipe";

export default function RecipeDetailPage() {
  const [currentStep, setCurrentStep] = useState();
  const { data: recipeList } = useGetRecipe();

  console.log(recipeList);

  return (
    <div className="w-full rounded-xl border bg-gray-100 p-8">
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
