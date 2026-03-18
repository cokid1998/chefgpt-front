import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { GET_MY_ARTICLE } from "@/constants/APIUrl";
import type { Article } from "@/types/articleType";
import type { Pagination } from "@/types/common";

type MyArticlePagination = Pagination<Article[]>;

const useGetMyArticle = (page: number, take: number = 6) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.article.my(page),
    queryFn: async () => {
      const res = await API.get<MyArticlePagination>(GET_MY_ARTICLE, {
        params: { page, take },
      });

      res.data.data.forEach((myArticle) =>
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(myArticle.id),
          myArticle,
        ),
      );

      return {
        myArticleIds: res.data.data.map((myArticle) => myArticle.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
  });
};

export default useGetMyArticle;
