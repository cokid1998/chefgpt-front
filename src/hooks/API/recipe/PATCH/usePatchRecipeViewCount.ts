import { PATCH_RECIPE_VIEWCOUNT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RecipeType } from "@/types/recipeType";

const usePatchRecipeViewCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: number) =>
      API.patch(PATCH_RECIPE_VIEWCOUNT(recipeId)),

    onMutate: async (recipeId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.recipe.byId(recipeId),
      });

      const prevRecipe = queryClient.getQueryData<RecipeType>(
        QUERY_KEYS.recipe.byId(recipeId),
      );

      queryClient.setQueryData<RecipeType>(
        QUERY_KEYS.recipe.byId(recipeId),
        (recipe) => {
          if (!recipe) throw new Error("레시피가 존재하지 않습니다.");

          return {
            ...recipe,
            viewCount: recipe.viewCount + 1,
          };
        },
      );

      return {
        prevRecipe,
      };
    },

    onError: (error, _, context) => {
      if (context && context.prevRecipe) {
        queryClient.setQueryData(
          QUERY_KEYS.recipe.byId(context.prevRecipe.id),
          context.prevRecipe,
        );
      }
    },
  });
};

export default usePatchRecipeViewCount;
