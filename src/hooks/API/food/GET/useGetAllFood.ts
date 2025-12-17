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
  // Todo: 쿼리 정규화
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.foods(category, search),
    queryFn: () =>
      API.get<FoodType[]>(FOODS_API_URL, { params: { category, search } }),
    select: (data) => data.data,
  });
};

export default useGetAllFood;
