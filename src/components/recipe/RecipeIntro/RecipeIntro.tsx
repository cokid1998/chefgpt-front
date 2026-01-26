import RecipeHeader from "@/components/recipe/RecipeIntro/RecipeHeader";
import { Separator } from "@/components/ui/separator";
import RecipeIngredientAccordion from "@/components/recipe/RecipeIntro/RecipeIngredientAccordion";
import type { IngredientType } from "@/types/recipeType";

interface RecipeIntroProps {
  title: string;
  description: string;
  youtubeUrl: string;
  checkedIngredient: number[];
  setCheckedIngredient: React.Dispatch<React.SetStateAction<number[]>>;
  accordionValue: string | undefined;
  setAccordionValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  ingredients: IngredientType[];
}

export default function RecipeIntro({
  title,
  description,
  youtubeUrl,
  checkedIngredient,
  setCheckedIngredient,
  accordionValue,
  setAccordionValue,
  ingredients,
}: RecipeIntroProps) {
  return (
    <>
      <RecipeHeader
        title={title}
        description={description}
        youtubeUrl={youtubeUrl}
      />
      <Separator className="my-4 w-full" />
      <RecipeIngredientAccordion
        checkedIngredient={checkedIngredient}
        setCheckedIngredient={setCheckedIngredient}
        accordionValue={accordionValue}
        setAccordionValue={setAccordionValue}
        ingredients={ingredients}
      />
    </>
  );
}
