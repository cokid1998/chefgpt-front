import { GET_RECIPE_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

const useGetRecipe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.list(),
    queryFn: () => API.get<RecipeType[]>(GET_RECIPE_URL),
    select: (data) => data.data,
  });
};

export default useGetRecipe;
