import { Clock, Users } from "lucide-react";

export default function RecipeHeader() {
  return (
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
            간단하면서도 풍미 가득한 스파게티입니다. 빠르고 쉽게 만들 수 있어
            바쁜 일상에도 적합한 메뉴입니다.
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
  );
}
