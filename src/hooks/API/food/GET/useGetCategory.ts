import { FOODS_CATEGORY_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { FoodCategory } from "@/types/refrigeratorType";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = () =>
  useQuery({
    queryKey: QUERY_KEYS.foodsCategory,
    queryFn: () => API.get<FoodCategory[]>(FOODS_CATEGORY_API_URL),
    select: (data) => data.data,
  });

export default useGetCategory;
