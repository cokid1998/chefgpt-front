import { GET_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article } from "@/types/articleType";
import type { Pagination } from "@/types/common";

type ArticlePagination = Pagination<Article[]>;

const useGetAllArticle = (
  category: string = "",
  search: string = "",
  page: number,
  take: number = 9,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.article.list(category, search, page),
    queryFn: async () => {
      const formatCategory = category === "전체" ? "" : category;

      const res = await API.get<ArticlePagination>(GET_ARTICLE, {
        params: { category: formatCategory, search, page, take },
      });

      res.data.data.forEach((article) =>
        queryClient.setQueryData(QUERY_KEYS.article.byId(article.id), article),
      );

      return {
        articleIds: res.data.data.map((article) => article.id),
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
    staleTime: 1 * 60 * 60 * 1000,
    gcTime: 1 * 60 * 60 * 1000,
  });
};

export default useGetAllArticle;
