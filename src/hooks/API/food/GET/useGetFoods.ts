import { FOODS_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type FoodType } from "@/types/refrigeratorType";

const useGetFoods = (userId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.foods,
    queryFn: () => API.get<FoodType[]>(FOODS_API_URL(userId)),
    select: (data) => {
      const foods = data.data;

      const countConfig = [
        {
          key: "totalCount",
          label: "🛒 전체 식재료",
          value: foods.length,
        },
        {
          key: "coldCount",
          label: "❄️ 냉장",
          value: foods.filter((food) => food.location === "COLD").length,
        },
        {
          key: "frozenCount",
          label: "🧊 냉동",
          value: foods.filter((food) => food.location === "FROZEN").length,
        },
        {
          key: "RoomTempCount",
          label: "🌡️ 실온",
          value: foods.filter((food) => food.location === "ROOM_TEMP").length,
        },
      ];

      return {
        foods,
        countConfig,
      };
    },
  });

export default useGetFoods;
