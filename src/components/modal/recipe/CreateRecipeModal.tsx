import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
  return (
    <div className="h-200 w-300 overflow-y-auto rounded-2xl bg-white p-4">
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

        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex w-fit rounded-xl bg-green-400/20 p-3">
              <ShoppingCart className="text-green-400" />
            </div>
            {/* Todo 내 냉장고에 있는 재료면 확인표시 기능 */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">필요한 재료</h1>
              <span>(0/7)</span>
            </div>
          </div>

          <div className="grid gap-3 px-10">
            {dummy.map((ingredient) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex cursor-pointer justify-between rounded-xl border-2 bg-red-200 p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/30" />
                  <span className="text-lg">{ingredient.name}</span>
                </div>
                <Badge
                  className="rounded-md border-0 bg-orange-500 text-orange-300"
                  variant="outline"
                >
                  {ingredient.amount}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* <Carousel className="relative left-1/2 w-200 -translate-1/2">
        <CarouselContent>
          {recipeScript.map((script) => (
            <CarouselItem>{script}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}
