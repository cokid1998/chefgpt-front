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

      return {
        foods,
        totalCount: foods.length,
        frozenCount: foods.filter((food) => food.location === "FROZEN").length,
        coldCount: foods.filter((food) => food.location === "COLD").length,
        RoomTempCount: foods.filter((food) => food.location === "ROOM_TEMP")
          .length,
      };
    },
  });

export default useGetFoods;
