import { GET_MY_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

const useGetMyRecipe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.my,
    queryFn: () => API.get<RecipeType[]>(GET_MY_RECIPE),
    select: (data) => data.data,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetMyRecipe;
