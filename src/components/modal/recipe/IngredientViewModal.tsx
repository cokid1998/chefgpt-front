import { useState } from "react";
import { ShoppingCart, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { IngredientType } from "@/types/recipeType";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCloseModal } from "@/store/modalStore";

interface IngredientViewModalProps {
  ingredients: IngredientType[];
}

export default function IngredientViewModal({
  ingredients,
}: IngredientViewModalProps) {
  const closeModal = useCloseModal();
  const [checkedIngredient, setCheckedIngredient] = useState<number[]>([]);

  const ingredientToggle = (index: number) => {
    if (checkedIngredient.includes(index)) {
      setCheckedIngredient(checkedIngredient.filter((i) => i !== index));
    } else {
      setCheckedIngredient([...checkedIngredient, index]);
    }
  };

  // Todo: Skeleton 처리
  if (!ingredients) return null;

  return (
    <div className="flex max-h-[90svh] w-[90vw] max-w-lg flex-col rounded-sm bg-white p-4 pb-10 md:max-w-2xl md:p-6 md:pb-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
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

          <div className="flex items-center">
            <h1 className="text-3xl font-bold">필요한 재료&nbsp;</h1>
            <span>{`${checkedIngredient.length} / ${ingredients.length}`}</span>
          </div>
        </div>

        <X onClick={closeModal} className="cursor-pointer" />
      </div>

      <Separator className="mt-5 mb-8" />

      <ScrollArea className="flex-1 overflow-auto">
        <div className="grid gap-3 px-4 md:px-10">
          {ingredients.map((ingredient, index) => {
            const isChecked = checkedIngredient.includes(index);
            return (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 1 }}
                className={`flex cursor-pointer justify-between rounded-xl border-2 p-4 text-left ${
                  isChecked ? "border-green-500/30 bg-green-500/20" : "bg-white"
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
                    className={`text-sm md:text-lg ${isChecked ? "text-gray-400 line-through" : ""}`}
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
        </div>
      </ScrollArea>
    </div>
  );
}
