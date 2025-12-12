import {
  Package,
  CircleX,
  Calendar,
  CircleCheck,
  CircleAlert,
  CircleQuestionMark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CategoryKrString, FoodType } from "@/types/refrigeratorType";
import dayjs from "dayjs";
import CreateFoodModal from "@/components/modal/refrigerator/CreateFoodModal";
import { motion } from "motion/react";
import { useOpenModal } from "@/store/modalStore";
import UpdateFoodModal from "@/components/modal/refrigerator/UpdateFoodModal";

export const switchLocationName = (
  location: "COLD" | "FROZEN" | "ROOM_TEMP" | null,
) => {
  switch (location) {
    case null:
      return "?";
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

const formatDday = (date: Date | null) => {
  if (date === null) return "D-?";
  const expirationDate = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");
  const diff = expirationDate.diff(today, "day");
  return diff < 0 ? `D+${Math.abs(diff)}` : `D-${diff}`;
};

const checkExpirationStatus = (date: Date | null) => {
  if (date === null) return "UNKNOWN";

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
  UNKNOWN: {
    borderColor: "border-gray-200",
    textLabel: "",
    textColor: "text-gray-500",
    icon: <CircleQuestionMark className="text-gray-500" />,
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

interface FoodCardProps {
  food: FoodType;
}

export default function FoodCard({ food }: FoodCardProps) {
  const openModal = useOpenModal();
  const expireStatus = checkExpirationStatus(food.expiration_date);
  const config = EXPIRE_STATUS_CONFIG[expireStatus];

  return (
    <motion.div
      key={food.id}
      whileHover={{ scale: 1.01 }}
      className={`rounded-xl border p-4 shadow transition-all hover:shadow-md ${config.borderColor} flex cursor-pointer flex-col justify-between bg-white`}
      onClick={() => openModal(<UpdateFoodModal />)}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
            <Badge
              className={`rounded-sm ${categoryBadgeColor(food.category.name)}`}
            >
              {food.category.name}
            </Badge>
          </div>

          <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
              <Package size={12} />
              {food.quantity ?? "?"} {food.unit ?? "?"}
            </span>

            <span className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
              {switchLocationName(food.location)}
            </span>
          </div>
        </div>

        <div className={`flex flex-col items-end ${config.textColor}`}>
          <span className="mb-1 text-2xl leading-none font-bold">
            {formatDday(food.expiration_date)}
          </span>

          <span className="text-xs font-medium opacity-80">
            {config.textLabel}
          </span>
        </div>
      </div>

      <div className="text-md text-gray-500">{food.memo}</div>

      <div
        className={`mt-3 flex items-center justify-between border-t border-dashed pt-3 ${config.borderColor}`}
      >
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar />
          <span>유통기한:</span>
          <span>
            {food.expiration_date
              ? dayjs(food.expiration_date).format("YYYY년 MM월 DD일")
              : "유통기한을 입력하지 않았습니다."}
          </span>
        </div>

        {config.icon}
      </div>
    </motion.div>
  );
}
