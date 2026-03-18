import { GET_LIKED_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { Article } from "@/types/articleType";
import type { Pagination } from "@/types/common";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type MyLikedArticlePagination = Pagination<Article[]>;

const useGetLikedArticle = (
  enabled: boolean,
  page: number,
  take: number = 6,
) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.article.liked(page),
    queryFn: async () => {
      const res = await API.get<MyLikedArticlePagination>(GET_LIKED_ARTICLE, {
        params: { page, take },
      });

      res.data.data.forEach((likedArticle) => {
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(likedArticle.id),
          likedArticle,
        );
      });

      return {
        myArticleIds: res.data.data.map((likedArticle) => likedArticle.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
    enabled,
  });
};

export default useGetLikedArticle;
