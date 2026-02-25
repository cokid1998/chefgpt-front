import { POST_TOGGLE_RECIPE_LiKE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { RecipeType } from "@/types/recipeType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: number) =>
      API.post(POST_TOGGLE_RECIPE_LiKE(recipeId)),

    onMutate: async (recipeId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.recipe.byId(recipeId),
      });

      const prevRecipe = queryClient.getQueryData<RecipeType>(
        QUERY_KEYS.recipe.byId(recipeId),
      );

      // 지금 문제: 인덱스 페이지에서 상세페이지로 들어가서 좋아요를 누르면 낙관적 업데이트가 바로 적용이 됨
      // 그런데 상세페이지에서 새로고침하고 좋아요를 누르면 UI가 바로 적용 안됨

      // 이유: useQuery의 select함수의 리턴값은 캐시가 아님
      // 캐시가 되는 데이터는 useQuery의 queryFn의 결과값임
      // 여기서 생기는 캐시값 타입 불일치가 원인으로 예상됨
      // 캐시 정규화를 진행하는 모든 코드 확인 필요
      // const key = QUERY_KEYS.recipe.byId(recipeId);
      // console.log("queryKey:", key);
      // console.log("prevRecipe:", prevRecipe);

      queryClient.setQueryData<RecipeType>(
        QUERY_KEYS.recipe.byId(recipeId),
        (recipe) => {
          if (!recipe) throw new Error("레시피가 존재하지 않습니다.");

          return {
            ...recipe,
            liked: !recipe.liked,
            likeCount: recipe.liked
              ? recipe.likeCount - 1
              : recipe.likeCount + 1,
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

export default usePostToggleLike;
