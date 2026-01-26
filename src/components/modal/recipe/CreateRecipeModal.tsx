import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecipeHeader from "@/components/recipe/RecipeIntro/RecipeHeader";
import RecipeIngredientAccordion from "@/components/recipe/RecipeIntro/RecipeIngredientAccordion";
import RecipeModalNavigate from "@/components/recipe/RecipeModalNavigate";
import { useState } from "react";
import type { RecipeInfoType } from "@/types/recipeType";

interface CreateRecipeModalProps {
  recipeInfo: RecipeInfoType;
  youtubeUrl: string;
}

export default function CreateRecipeModal({
  recipeInfo,
  youtubeUrl,
}: CreateRecipeModalProps) {
  // Todo: 모달이 꺼질 때 캐시된 script데이터 삭제해야함
  const [currentStep, setCurrentStep] = useState(0);

  console.log(youtubeUrl);

  return (
    <ScrollArea className="h-200 w-300 overflow-y-auto rounded-2xl bg-white p-4">
      <div className="w-full rounded-xl border bg-gray-100 p-8">
        <RecipeHeader
          title={recipeInfo.title}
          description={recipeInfo.description}
          youtubeUrl={youtubeUrl}
        />

        <Separator className="my-4 w-full" />

        <RecipeIngredientAccordion />

        <Separator className="my-4 w-full" />

        <RecipeModalNavigate
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          totalLength={recipeInfo.steps.length}
        />
      </div>
    </ScrollArea>
  );
}
