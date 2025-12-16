import { UPDATE_FOOD_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { FoodType } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

const useGetOneFood = (foodId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.foodsById(foodId),
    queryFn: () => API.get<FoodType>(UPDATE_FOOD_API_URL(foodId)),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export default useGetOneFood;
