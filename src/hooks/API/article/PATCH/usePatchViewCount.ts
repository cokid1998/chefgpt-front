import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATCH_ARTICLE_VIEWCOUNT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import type { Article } from "@/types/articleType";

const usePatchArticleViewCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: number) =>
      API.patch(PATCH_ARTICLE_VIEWCOUNT(articleId)),

    // 낙관적 업데이트
    // https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
    onMutate: async (articleId: number) => {
      // 1. 진행중인 쿼리 취소 (충돌 방지)
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.article.byId(articleId),
      });

      // 2. 현재 데이터 백업 (에러시 롤백용)
      const prevArticle = queryClient.getQueryData<Article>(
        QUERY_KEYS.article.byId(articleId),
      );

      // 3. 서버 응답과 관계없이 화면에 바로 반영
      queryClient.setQueryData<Article>(
        QUERY_KEYS.article.byId(articleId),
        (article) => {
          if (!article) throw new Error("아티클이 존재하지 않습니다.");
          return {
            ...article,
            viewCount: article.viewCount + 1,
          };
        },
      );

      // 4. 백업 데이터 리턴 (에러시에만 사용)
      return {
        prevArticle,
      };
    },

    onError: (error, _, context) => {
      // API에러시 백업해둔 데이터로 롤백
      if (context && context.prevArticle) {
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(context.prevArticle.id),
          context.prevArticle,
        );
      }
    },
  });
};

export default usePatchArticleViewCount;
