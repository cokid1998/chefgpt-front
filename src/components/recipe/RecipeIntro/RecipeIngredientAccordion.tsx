import { ShoppingCart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import type { YoutubeIngredientType } from "@/types/recipeType";

interface RecipeIngredientAccordionProps {
  checkedIngredient: number[];
  setCheckedIngredient: React.Dispatch<React.SetStateAction<number[]>>;
  accordionValue: string | undefined;
  setAccordionValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  ingredients: YoutubeIngredientType[];
}

export default function RecipeIngredientAccordion({
  checkedIngredient,
  setCheckedIngredient,
  accordionValue,
  setAccordionValue,
  ingredients,
}: RecipeIngredientAccordionProps) {
  const ingredientToggle = (index: number) => {
    // checkedIngredient에 index가 포함되어있는지 확인, 이 경우는 체크 해제
    if (checkedIngredient.includes(index)) {
      setCheckedIngredient(checkedIngredient.filter((i) => i !== index));
    } else {
      setCheckedIngredient([...checkedIngredient, index]);
    }
  };

  const accordionToggle = () => {
    if (!accordionValue) {
      setAccordionValue("recepe-item");
    } else {
      setAccordionValue("");
    }
  };

  useEffect(() => {
    // 모든 재료를 체크했을 때만 자동으로 닫기
    if (ingredients.length === checkedIngredient.length) {
      setAccordionValue("");
    }
  }, [checkedIngredient, setAccordionValue]);

  return (
    <Accordion type="single" value={accordionValue} collapsible>
      <AccordionItem value={accordionValue ?? ""}>
        <AccordionTrigger
          className="mb-4 flex w-full cursor-pointer items-center"
          headerClassName="block w-full"
          chevronIconClassName="text-black"
          onClick={accordionToggle}
        >
          <div className="flex gap-3">
            <div
              className={`flex w-fit rounded-xl p-3 ${
                checkedIngredient.length === ingredients.length
                  ? "bg-green-400/20"
                  : "bg-orange-400/20"
              }`}
            >
              <ShoppingCart
                className={`${
                  checkedIngredient.length === ingredients.length
                    ? "text-green-400"
                    : "text-orange-400"
                }`}
              />
            </div>
            {/* Todo 내 냉장고에 있는 재료면 확인표시 기능 */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">필요한 재료&nbsp;</h1>
              <span>{`${checkedIngredient.length} / ${ingredients.length}`}</span>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="grid gap-3 px-10">
          {ingredients.map((ingredient, index) => {
            const isChecked = checkedIngredient.includes(index);
            return (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 1 }}
                className={`flex cursor-pointer justify-between rounded-xl border-2 p-4 text-left ${
                  isChecked
                    ? "border-green-500/30 bg-green-500/20"
                    : "border-white bg-white hover:border-white"
                }`}
                onClick={() => ingredientToggle(index)}
                key={ingredient.name}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      isChecked ? "border-green-500 bg-green-500" : ""
                    }`}
                  >
                    {isChecked && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span
                    className={`text-lg ${isChecked ? "text-gray-400 line-through" : ""}`}
                  >
                    {ingredient.name}
                  </span>
                </div>
                <Badge
                  className={`rounded-md border-0 text-white ${
                    isChecked ? "bg-green-500" : "bg-orange-500"
                  }`}
                  variant="outline"
                >
                  {ingredient.amount}
                </Badge>
              </motion.button>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
