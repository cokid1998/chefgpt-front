import { GET_MY_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";
import type { Pagination } from "@/types/common";

type MyRecipePagination = Pagination<RecipeType[]>;

const useGetMyRecipe = (page: number, take: number = 9) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.recipe.my(page),
    queryFn: async () => {
      const res = await API.get<MyRecipePagination>(GET_MY_RECIPE, {
        params: {
          page,
          take,
        },
      });

      res.data.data.forEach((recipe) => {
        queryClient.setQueryData(QUERY_KEYS.recipe.byId(recipe.id), recipe);
      });

      return {
        myRecipeIds: res.data.data.map((recipe) => recipe.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetMyRecipe;
