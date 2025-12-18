import { GET_ONE_FOOD_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { FoodType } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

const useGetOneFood = (foodId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.food.byId(foodId),
    queryFn: () => API.get<FoodType>(GET_ONE_FOOD_URL(foodId)),
    select: (data) => data.data || data, // 캐시된 데이터가 있을 때 data를 리턴, 반대는 data.data리턴
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetOneFood;
