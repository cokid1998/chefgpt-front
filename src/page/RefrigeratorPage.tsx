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
import type { CategoryKrString, FoodType } from "@/types/refrigeratorType";
import useGetFoods from "@/hooks/API/food/GET/useGetFoods";
import { useProfile } from "@/store/authStore";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";
import dayjs from "dayjs";

const switchLocationName = (location: "COLD" | "FROZEN" | "ROOM_TEMP") => {
  switch (location) {
    case "COLD":
      return "❄️ 냉장";
    case "FROZEN":
      return "🧊 냉동";
    case "ROOM_TEMP":
      return "🌡️ 실온";
    default:
      "🛒 전체 식재료";
  }
};

const formatDday = (date: Date) => {
  const expirationDate = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");
  const diff = expirationDate.diff(today, "day");
  return diff < 0 ? `D+${Math.abs(diff)}` : `D-${diff}`;
};

const checkExpirationStatus = (date: Date) => {
  const expirationDate = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");
  const diff = expirationDate.diff(today, "day");

  if (today > expirationDate) {
    return "EXPIRE"; // 유통기한 지남
  } else if (diff < 7) {
    return "IMMINENT"; // 유통기한 임박
  } else {
    return "NORMAL"; // 유통기한 남음
  }
};

const EXPIRE_STATUS_CONFIG = {
  EXPIRE: {
    borderColor: "border-red-200",
    textLabel: "유통기한 지남",
    textColor: "text-red-500",
    icon: <CircleX className="text-red-500" />,
  },
  IMMINENT: {
    borderColor: "border-yellow-200",
    textLabel: "유통기한 임박",
    textColor: "text-yellow-500",
    icon: <CircleAlert className="text-yellow-500" />,
  },
  NORMAL: {
    borderColor: "border-green-200",
    textLabel: "",
    textColor: "text-green-500",
    icon: <CircleCheck className="text-green-500" />,
  },
} as const;

const categoryBadgeColor = (category: CategoryKrString) => {
  switch (category) {
    case "채소":
      return "bg-green-100 text-green-700";
    case "육류":
      return "bg-red-100 text-red-700";
    case "유제품":
      return "bg-blue-100 text-blue-700";
    case "해산물":
      return "bg-sky-100 text-sky-700";
    case "과일":
      return "bg-lime-100 text-lime-700";
    case "조미료":
      return "bg-purple-100 text-purple-700";
    case "기타":
      return "bg-gray-100 text-gray-700";
    case "곡물":
      return "bg-amber-100 text-amber-700";
  }
};

function RefrigeratorPage() {
  const profile = useProfile();
  const { data: foodsData, isLoading } = useGetFoods(profile?.id!); // Todo: !를 써도 괜찮은걸까??
  const { data: foodsCategory } = useGetCategory();

  if (!foodsData || isLoading || !foodsCategory) return null; // Todo: 로딩처리

  return (
    <div className="flex flex-col">
      <div className="bg-green-gradient">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-12">
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
      </div>

      <div className="mx-auto flex w-full max-w-7xl justify-between gap-8 px-8 py-8">
        <div className="flex w-full flex-col gap-8">
          <div className="grid grid-cols-4 gap-4">
            {foodsData.countConfig.map((count) => (
              <div
                key={count.key}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <p className="mb-1 text-sm text-gray-500">{count.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {count.value}개
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <InputGroup className="mb-4 h-12">
              <InputGroupInput placeholder="식재료 검색..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {foodsCategory?.map((category) => (
                <Badge
                  key={category.id}
                  variant={"outline"}
                  className="w-14 cursor-pointer border-green-200 px-3 py-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {foodsData?.foods.map((food) => {
              const expireStatus = checkExpirationStatus(food.expiration_date);
              const config = EXPIRE_STATUS_CONFIG[expireStatus];

              return (
                <div
                  key={food.id}
                  className={`rounded-xl border p-4 shadow transition-all hover:shadow-md ${config.borderColor}`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {food.name}
                        </h3>
                        <Badge
                          className={`rounded-sm ${categoryBadgeColor(food.category.name)}`}
                        >
                          {food.category.name}
                        </Badge>
                      </div>

                      <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                          <Package size={12} />
                          {food.quantity} {food.unit}
                        </span>
                        <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                          {switchLocationName(food.location)}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex flex-col items-end ${config.textColor}`}
                    >
                      <span className="mb-1 text-2xl leading-none font-bold">
                        {formatDday(food.expiration_date)}
                      </span>
                      <span className="text-xs font-medium opacity-80">
                        {config.textLabel}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-3 flex items-center justify-between border-t border-dashed pt-3 ${config.borderColor}`}
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar />
                      <span>유통기한:</span>
                      <span>
                        {dayjs(food.expiration_date).format("YYYY년 MM월 DD일")}
                      </span>
                    </div>

                    {config.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Chatbot foods={foodsData.foods} />
      </div>
    </div>
  );
}

export default RefrigeratorPage;

/**
 * Todo:
 * 유통기한 필터링 하는 UI
 * 식재료 추가 모달
 * 식재료 수정 모달
 * queryKey 정규화
 * 초기 음식데이터 렌더링시 유통기한상태에 따라서 정렬해서 보여주기
 */
