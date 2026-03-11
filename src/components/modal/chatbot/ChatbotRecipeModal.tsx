import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecipeModalNavigate from "@/components/recipe/RecipeModalNavigate";
import RecipeIntro from "@/components/recipe/RecipeIntro/RecipeIntro";
import RecipeStepSlide from "@/components/recipe/RecipeStepSlide/RecipeStepSlide";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { ChatbotRecipe } from "@/types/recipeType";
import usePostCreateRecipe from "@/hooks/API/recipe/POST/usePostCreateRecipe";

interface ChatbotRecipeModalProps {
  recipe: ChatbotRecipe;
}

export default function ChatbotRecipeModal({
  recipe,
}: ChatbotRecipeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedIngredient, setCheckedIngredient] = useState<number[]>([]);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    "recepe-item",
  );

  const { mutate: createRecipe } = usePostCreateRecipe();

  const handleCreateRecipe = () => {
    const formatData = {
      ...recipe,
      recipeSource: "CHATBOT" as const,
    };
    createRecipe({ payload: formatData, youtubeUrl: "" });
  };

  return (
    <ScrollArea
      className="h-[95svh] w-[95vw] overflow-y-auto rounded-2xl bg-white p-3 md:h-200 md:w-300 md:p-4"
      viewportClassName="!h-full [&>div]:h-full"
    >
      <div className="flex h-full w-full flex-col rounded-xl border bg-gray-100 p-4 md:p-8">
        {currentStep === 0 && (
          <RecipeIntro
            checkedIngredient={checkedIngredient}
            setCheckedIngredient={setCheckedIngredient}
            accordionValue={accordionValue}
            setAccordionValue={setAccordionValue}
            recipeInfo={recipe}
          />
        )}
        {currentStep !== 0 && (
          <RecipeStepSlide
            step={recipe.steps[currentStep - 1]}
            currentStep={currentStep}
          />
        )}

        <div className="mt-auto">
          <Separator className="my-4 w-full" />

          <RecipeModalNavigate
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            totalLength={recipe.steps.length}
          />

          <Button
            variant="outline"
            className="mt-5 w-full border border-green-500 bg-green-500/10 text-black hover:bg-green-400/20"
            onClick={handleCreateRecipe}
          >
            레시피 저장하기
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
