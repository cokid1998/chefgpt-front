import RecipeHeader from "@/components/recipe/RecipeIntro/RecipeHeader";
import { Separator } from "@/components/ui/separator";
import RecipeIngredientAccordion from "@/components/recipe/RecipeIntro/RecipeIngredientAccordion";

interface RecipeIntroProps {
  title: string;
  description: string;
  youtubeUrl: string;
}

export default function RecipeIntro({
  title,
  description,
  youtubeUrl,
}: RecipeIntroProps) {
  return (
    <>
      <RecipeHeader
        title={title}
        description={description}
        youtubeUrl={youtubeUrl}
      />
      <Separator className="my-4 w-full" />
      <RecipeIngredientAccordion />
    </>
  );
}
