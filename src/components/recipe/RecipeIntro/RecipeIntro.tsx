import RecipeHeader from "@/components/recipe/RecipeIntro/RecipeHeader";
import { Separator } from "@/components/ui/separator";
import RecipeIngredientAccordion from "@/components/recipe/RecipeIntro/RecipeIngredientAccordion";
import type { RecipeInfoType } from "@/types/recipeType";

interface RecipeIntroProps {
  youtubeUrl: string;
  checkedIngredient: number[];
  setCheckedIngredient: React.Dispatch<React.SetStateAction<number[]>>;
  accordionValue: string | undefined;
  setAccordionValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  recipeInfo: RecipeInfoType;
}

export default function RecipeIntro({
  youtubeUrl,
  checkedIngredient,
  setCheckedIngredient,
  accordionValue,
  setAccordionValue,
  recipeInfo,
}: RecipeIntroProps) {
  return (
    <>
      <RecipeHeader
        title={recipeInfo.title}
        description={recipeInfo.description}
        youtubeUrl={youtubeUrl}
        category={recipeInfo.category}
      />
      <Separator className="my-4 w-full" />
      <RecipeIngredientAccordion
        checkedIngredient={checkedIngredient}
        setCheckedIngredient={setCheckedIngredient}
        accordionValue={accordionValue}
        setAccordionValue={setAccordionValue}
        ingredients={recipeInfo.ingredients}
      />
    </>
  );
}
