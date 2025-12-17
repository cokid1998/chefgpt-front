import { FOODS_CATEGORY_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { FoodCategory } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = () =>
  useQuery({
    queryKey: QUERY_KEYS.category.food,
    queryFn: () => API.get<FoodCategory[]>(FOODS_CATEGORY_API_URL),
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });

export default useGetCategory;
