import { Separator } from "@/components/ui/separator";
import { Clock, Users, ShoppingCart, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const dummy = [
  { name: "스파게티", amount: "200g" },
  { name: "마늘", amount: "5쪽" },
  { name: "올리브 오일", amount: "3큰술" },
  { name: "고추", amount: "1개" },
  { name: "파슬리", amount: "약간" },
  { name: "소금", amount: "적당량" },
  { name: "후추", amount: "적당량" },
];

interface CreateRecipeModalProps {
  recipeScript: string[];
  youtubeUrl: string;
}

export default function CreateRecipeModal({
  recipeScript,
  youtubeUrl,
}: CreateRecipeModalProps) {
  const [checkedIngredient, setCheckedIngredient] = useState<number[]>([]);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    "recepe-item",
  );
  // Todo: 모달이 꺼질 때 캐시된 script데이터 삭제해야함

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
    if (dummy.length === checkedIngredient.length) {
      setAccordionValue("");
    } else {
      setAccordionValue("recipe-item");
    }
  }, [checkedIngredient]);

  return (
    <ScrollArea className="h-200 w-300 overflow-y-auto rounded-2xl bg-white p-4">
      <div className="w-full rounded-xl border bg-gray-100 p-8">
        <div className="grid w-full grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="focus:ring-ring hover:bg-primary/80 inline-flex items-center rounded-md border-0 border-transparent bg-orange-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  양식
                </div>
                <div className="focus:ring-ring inline-flex items-center rounded-md border-0 bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none">
                  쉬움
                </div>
              </div>
              <h1 className="mb-4 text-4xl leading-tight font-bold">
                스파게티 알리오 올리오
              </h1>
              <p className="text-lg leading-relaxed">
                이탈리아의 대표적인 파스타 요리로, 마늘과 올리브 오일을 활용한
                간단하면서도 풍미 가득한 스파게티입니다. 빠르고 쉽게 만들 수
                있어 바쁜 일상에도 적합한 메뉴입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-black p-4">
                <div className="mb-1 flex items-center gap-2 text-green-400">
                  <Clock className="size-4" />
                  <span className="text-sm font-medium">조리 시간</span>
                </div>
                <p className="font-semibold text-white">20분</p>
              </div>
              <div className="rounded-xl bg-black p-4">
                <div className="mb-1 flex items-center gap-2 text-green-400">
                  <Users className="size-4" />
                  <span className="text-sm font-medium">인분</span>
                </div>
                <p className="font-semibold text-white">2인분</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://img.youtube.com/vi/sMFjET_qDLc/maxresdefault.jpg"
              alt="스파게티 알리오 올리오"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>
        </div>

        <Separator className="my-4 w-full" />

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
                    checkedIngredient.length === dummy.length
                      ? "bg-green-400/20"
                      : "bg-orange-400/20"
                  }`}
                >
                  <ShoppingCart
                    className={`${
                      checkedIngredient.length === dummy.length
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  />
                </div>
                {/* Todo 내 냉장고에 있는 재료면 확인표시 기능 */}
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold">필요한 재료&nbsp;</h1>
                  <span>{`${checkedIngredient.length} / ${dummy.length}`}</span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="grid gap-3 px-10">
              {dummy.map((ingredient, index) => {
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
      </div>
    </ScrollArea>
  );
}
