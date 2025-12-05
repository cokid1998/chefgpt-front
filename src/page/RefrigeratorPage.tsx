import { Button } from "@/components/ui/button";
import {
  Package,
  Plus,
  Refrigerator,
  CircleX,
  Calendar,
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Chatbot from "@/components/refrigerator/Chatbot";
import type { FoodType } from "@/types/refrigerator";

const CATEGORY = [
  "전체",
  "채소",
  "과일",
  "육류",
  "해산물",
  "유제품",
  "곡물",
  "조미료",
  "기타",
];

const FOODS: FoodType[] = [
  {
    id: 1,
    name: "양배추",
    quantity: 1,
    unit: "개",
    expiration_date: new Date(),
    memo: "",
    category: {
      id: 1,
      name: "기타",
    },
    location: "COLD",
  },
  {
    id: 2,
    name: "돼지고기",
    quantity: 500,
    unit: "g",
    location: "FROZEN",
    expiration_date: new Date(),
    memo: "",
    category: {
      id: 1,
      name: "기타",
    },
  },
  {
    id: 3,
    name: "우유",
    quantity: 500,
    unit: "L",
    location: "COLD",
    expiration_date: new Date(),
    memo: "",
    category: {
      id: 1,
      name: "기타",
    },
  },
  {
    id: 4,
    name: "계란",
    quantity: 500,
    unit: "개",
    location: "COLD",
    expiration_date: new Date(),
    memo: "",
    category: {
      id: 1,
      name: "기타",
    },
  },
  {
    id: 5,
    name: "대파",
    quantity: 500,
    unit: "대",
    location: "COLD",
    expiration_date: new Date(),
    memo: "",
    category: {
      id: 1,
      name: "기타",
    },
  },
  {
    id: 6,
    name: "식용유",
    quantity: 1,
    unit: "병",
    location: "ROOM_TEMP",
    expiration_date: new Date(),
    memo: "카놀라유",
    category: {
      id: 1,
      name: "기타",
    },
  },
];

function RefrigeratorPage() {
  return (
    <div className="flex flex-col">
      <div className="bg-green-gradient mx-auto flex w-full items-center justify-between px-8 py-12">
        <div className="flex flex-col">
          <div className="mb-3 flex gap-3">
            <Refrigerator size={40} color="white" />
            <h1 className="text-4xl font-bold text-white">내 냉장고</h1>
          </div>
          <p className="text-xl text-white">
            냉장고 속 식재료를 관리하고 AI에게 레시피를 추천받으세요
          </p>
        </div>

        <Button
          variant="outline"
          size={"lg"}
          className="text-green-600 hover:text-green-600"
        >
          <Plus />
          식재료 추가
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-7xl justify-between gap-8 px-8 py-8">
        <div className="flex w-full flex-col gap-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-500">🛒 전체 식재료</p>
              <p className="text-2xl font-bold text-gray-900">5개</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-500">❄️ 냉장</p>
              <p className="text-2xl font-bold text-gray-900">4개</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-500">🧊 냉동</p>
              <p className="text-2xl font-bold text-gray-900">4개</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-gray-500">🌡️ 실온</p>
              <p className="text-2xl font-bold text-gray-900">4개</p>
            </div>
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <InputGroup className="mb-4 h-12">
              <InputGroupInput placeholder="식재료 검색..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {CATEGORY.map((category) => (
                <Badge
                  key={category}
                  variant={"outline"}
                  className="cursor-pointer border-green-100 px-5 py-2 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-red-200 p-4 shadow transition-all hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">양배추</h3>
                    <Badge className="rounded-sm bg-green-100 text-green-700">
                      채소
                    </Badge>
                  </div>

                  <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      <Package size={12} />1 개
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      ❄️ 냉장
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-red-600">
                  <span className="mb-1 text-2xl leading-none font-bold">
                    D+10
                  </span>
                  <span className="text-xs font-medium opacity-80">
                    유통기한 만료
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-dashed border-red-200 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar />
                  <span>유통기한:</span>
                  <span className="font-medium text-red-600">
                    2025년 01월 25일
                  </span>
                </div>

                <CircleX className="text-red-600" />
              </div>
            </div>

            <div className="rounded-xl border border-yellow-200 p-4 shadow transition-all hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">양배추</h3>
                    <Badge className="rounded-sm bg-green-100 text-green-700">
                      채소
                    </Badge>
                  </div>

                  <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      <Package size={12} />1 개
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      ❄️ 냉장
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-yellow-600">
                  <span className="mb-1 text-2xl leading-none font-bold">
                    D-3
                  </span>
                  <span className="text-xs font-medium opacity-80">
                    유통기한 임박
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-dashed border-yellow-200 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar />
                  <span>유통기한:</span>
                  <span className="font-medium text-yellow-600">
                    2025년 01월 25일
                  </span>
                </div>

                <CircleAlert className="text-yellow-600" />
              </div>
            </div>

            <div className="rounded-xl border border-green-200 p-4 shadow transition-all hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">양배추</h3>
                    <Badge className="rounded-sm bg-green-100 text-green-700">
                      채소
                    </Badge>
                  </div>

                  <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      <Package size={12} />1 개
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                      ❄️ 냉장
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end text-green-600">
                  <span className="mb-1 text-2xl leading-none font-bold">
                    D-314
                  </span>
                  {/* <span className="text-xs font-medium opacity-80">
                    유통기한 만료
                  </span> */}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-dashed border-green-200 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar />
                  <span>유통기한:</span>
                  <span className="font-medium text-green-600">
                    2025년 01월 25일
                  </span>
                </div>

                <CircleCheck className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <Chatbot foods={FOODS} />
      </div>
    </div>
  );
}

export default RefrigeratorPage;
