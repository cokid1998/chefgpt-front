import { GET_MY_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

const useGetMyRecipe = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.recipe.my,
    queryFn: async () => {
      const res = await API.get<RecipeType[]>(GET_MY_RECIPE);

      res.data.forEach((recipe) => {
        queryClient.setQueryData(QUERY_KEYS.recipe.byId(recipe.id), recipe);
      });

      return res.data.map((recipe) => recipe.id);
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetMyRecipe;
