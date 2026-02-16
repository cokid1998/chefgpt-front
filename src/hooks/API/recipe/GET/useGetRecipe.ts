import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import { GET_RECIPE } from "@/constants/APIUrl";
import type { RecipeType } from "@/types/recipeType";

const useGetRecipe = (categoryId: number, search: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.list(categoryId, search),
    queryFn: () =>
      API.get<RecipeType[]>(GET_RECIPE, {
        params: {
          categoryId,
          search,
        },
      }),
    select: (data) => data.data,
  });
};

export default useGetRecipe;
