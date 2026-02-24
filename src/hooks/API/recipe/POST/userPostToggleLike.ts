import { POST_TOGGLE_RECIPE_LiKE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: number) =>
      API.post(POST_TOGGLE_RECIPE_LiKE(recipeId)),

    // 토글 후 UI 변경을 위한 캐시 초기화 후 리패치
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.recipe.byId(recipeId),
      });
    },
  });
};

export default usePostToggleLike;
