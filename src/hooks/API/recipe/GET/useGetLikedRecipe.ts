import { GET_LIKED_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";
import type { Pagination } from "@/types/common";

type MyLikedPagination = Pagination<RecipeType[]>;

/**
 * 좋아요 누른 레시피 리스트
 */
const useGetLikedRecipe = (
  enabled: boolean,
  page: number,
  take: number = 9,
) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.recipe.liked(page),
    queryFn: async () => {
      const res = await API.get<MyLikedPagination>(GET_LIKED_RECIPE, {
        params: {
          page,
          take,
        },
      });

      res.data.data.forEach((likedRecipe) => {
        queryClient.setQueryData(
          QUERY_KEYS.recipe.byId(likedRecipe.id),
          likedRecipe,
        );
      });

      return {
        likedRecipeIds: res.data.data.map((likedRecipe) => likedRecipe.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
    enabled,
  });
};

export default useGetLikedRecipe;
