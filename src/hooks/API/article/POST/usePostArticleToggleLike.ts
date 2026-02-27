import { POST_TOGGLE_ARTICLE_LIKE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { Article } from "@/types/articleType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostArticleToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: number) =>
      API.post(POST_TOGGLE_ARTICLE_LIKE(articleId)),

    onMutate: async (articleId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.article.byId(articleId),
      });

      const prevArticle = queryClient.getQueryData<Article>(
        QUERY_KEYS.article.byId(articleId),
      );

      queryClient.setQueryData<Article>(
        QUERY_KEYS.article.byId(articleId),
        (article) => {
          if (!article) throw new Error("레시피가 존재하지 않습니다.");

          return {
            ...article,
            liked: !article.liked,
            likeCount: article.liked
              ? article.likeCount - 1
              : article.likeCount + 1,
          };
        },
      );

      // 내 정보 카운트 캐싱 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count.myInfo });

      return {
        prevArticle,
      };
    },

    onError: (error, _, context) => {
      if (context && context.prevArticle) {
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(context.prevArticle.id),
          context.prevArticle,
        );
      }
    },
  });
};

export default usePostArticleToggleLike;
