import { FOODS_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { type FoodType } from "@/types/refrigeratorType";

const useGetAllFood = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.foods,
    queryFn: async () => {
      const foods = await API.get<FoodType[]>(FOODS_API_URL);
      foods.data.forEach((food) => {
        queryClient.setQueryData<FoodType>(QUERY_KEYS.foodsById(food.id), food);
      });

      return foods.data.map((food) => food.id);
    },
    select: (ids) => {
      const foods = ids.map((id) =>
        queryClient.getQueryData<FoodType>(QUERY_KEYS.foodsById(id)),
      );

      const countConfig = [
        {
          key: "totalCount",
          label: "🛒 전체 식재료",
          value: foods.length,
        },
        {
          key: "coldCount",
          label: "❄️ 냉장",
          value: foods.filter((food) => food?.location === "COLD").length,
        },
        {
          key: "frozenCount",
          label: "🧊 냉동",
          value: foods.filter((food) => food?.location === "FROZEN").length,
        },
        {
          key: "RoomTempCount",
          label: "🌡️ 실온",
          value: foods.filter((food) => food?.location === "ROOM_TEMP").length,
        },
      ];

      return {
        foods,
        countConfig,
      };
    },
  });
};

export default useGetAllFood;
