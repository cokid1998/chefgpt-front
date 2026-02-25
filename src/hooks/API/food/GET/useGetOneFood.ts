import { GET_ONE_FOOD_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { FoodType } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

const useGetOneFood = (foodId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.food.byId(foodId),
    queryFn: async () => {
      const res = await API.get<FoodType>(GET_ONE_FOOD_URL(foodId));
      return res.data;
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetOneFood;
