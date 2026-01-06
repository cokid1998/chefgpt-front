import { GET_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/types/articleType";

/**
 * Todo: 캐시정규화
 */
const useGetAllArticle = () => {
  return useQuery({
    queryKey: QUERY_KEYS.article.list(),
    queryFn: () => API.get<Article[]>(GET_ARTICLE),
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });
};

export default useGetAllArticle;
