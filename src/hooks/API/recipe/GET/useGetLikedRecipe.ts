import { GET_LIKED_RECIPE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

/**
 * 좋아요 누른 레시피 리스트
 */
const useGetLikedRecipe = (enabled: boolean) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.recipe.liked,
    queryFn: async () => {
      const res = await API.get<RecipeType[]>(GET_LIKED_RECIPE);

      res.data.forEach((likedRecipe) => {
        queryClient.setQueryData(
          QUERY_KEYS.recipe.byId(likedRecipe.id),
          likedRecipe,
        );
      });

      return res.data.map((likedRecipe) => likedRecipe.id);
    },
    enabled,
  });
};

export default useGetLikedRecipe;
