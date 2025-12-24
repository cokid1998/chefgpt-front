import { FOODS_CATEGORY_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { CategoryKrString, FoodCategory } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

export const CATEGORY_EMOJI: Record<CategoryKrString, string> = {
  채소: "🥬",
  과일: "🍎",
  유제품: "🥛",
  곡물: "🌾",
  해산물: "🐟",
  육류: "🥩",
  기타: "📦",
  조미료: "🧂",
};

const useGetCategory = () =>
  useQuery({
    queryKey: QUERY_KEYS.category.food,
    queryFn: () => API.get<FoodCategory[]>(FOODS_CATEGORY_API_URL),
    select: (data) => {
      const cat = data.data;
      const catWithEmoji = cat.map((cat) => ({
        ...cat,
        icon: CATEGORY_EMOJI[cat.name],
      }));
      return catWithEmoji;
    },
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });

export default useGetCategory;
