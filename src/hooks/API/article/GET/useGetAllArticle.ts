import { GET_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/articleType";

/**
 * Todo: 캐시정규화
 */
const useGetAllArticle = (category: string = "", search: string = "") => {
  return useQuery({
    queryKey: QUERY_KEYS.article.list(category, search),
    queryFn: () => {
      const formatCategory = category === "전체" ? "" : category;
      return API.get<Article[]>(GET_ARTICLE, {
        params: { category: formatCategory, search },
      });
    },
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });
};

export default useGetAllArticle;
