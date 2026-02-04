import { GET_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article } from "@/types/articleType";

const useGetAllArticle = (category: string = "", search: string = "") => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.article.list(category, search),
    queryFn: async () => {
      const formatCategory = category === "전체" ? "" : category;
      const articles = await API.get<Article[]>(GET_ARTICLE, {
        params: { category: formatCategory, search },
      });

      articles.data.forEach((article) =>
        queryClient.setQueryData(QUERY_KEYS.article.byId(article.id), article),
      );

      return articles.data.map((article) => article.id);
    },
    staleTime: 1 * 60 * 60 * 1000,
    gcTime: 1 * 60 * 60 * 1000,
  });
};

export default useGetAllArticle;
