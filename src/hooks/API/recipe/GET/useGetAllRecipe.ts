import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_RECIPE } from "@/constants/APIUrl";
import type { RecipeType } from "@/types/recipeType";
import type { Pagination } from "@/types/common";

type RecipePagination = Pagination<RecipeType[]>;

const useGetAllRecipe = (
  categoryId: number,
  search: string,
  page: number,
  take: number = 9,
) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.recipe.list(categoryId, search, page),
    queryFn: async () => {
      const res = await API.get<RecipePagination>(GET_RECIPE, {
        params: {
          categoryId,
          search,
          page,
          take,
        },
      });

      res.data.data.forEach((recipe) => {
        queryClient.setQueryData(QUERY_KEYS.recipe.byId(recipe.id), recipe);
      });

      return {
        recipeIds: res.data.data.map((recipe) => recipe.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
  });
};

export default useGetAllRecipe;
