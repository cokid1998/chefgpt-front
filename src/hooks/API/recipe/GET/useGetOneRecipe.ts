import { GET_ONE_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

const useGetOneRecipe = (recipeId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.byId(recipeId),
    queryFn: async () => {
      const res = await API.get<RecipeType>(GET_ONE_RECIPE(recipeId));
      return res.data;
    },
    // queryFn: () => API.get<RecipeType>(GET_ONE_RECIPE(recipeId)),
    // select: (data) => data.data || data,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetOneRecipe;
