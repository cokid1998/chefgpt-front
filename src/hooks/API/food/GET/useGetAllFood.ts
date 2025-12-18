import { FOODS_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { type FoodType } from "@/types/refrigeratorType";

const useGetAllFood = (category: string = "", search: string = "") => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.food.list(category, search),
    queryFn: async () => {
      const formatCategory = category === "전체" ? "" : category;
      const foods = await API.get<FoodType[]>(FOODS_API_URL, {
        params: { category: formatCategory, search },
      });
      foods.data.forEach((food) => {
        queryClient.setQueryData(QUERY_KEYS.food.byId(food.id), food);
      });

      return foods.data.map((food) => food.id);
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetAllFood;
