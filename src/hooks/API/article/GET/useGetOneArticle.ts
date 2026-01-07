import { GET_ONE_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { Article } from "@/types/articleType";
import { useQuery } from "@tanstack/react-query";

const useGetOneArticle = (articleId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.article.byId(articleId),
    queryFn: () => API.get<Article>(GET_ONE_ARTICLE(articleId)),
    select: (data) => data.data || data, // 캐시된 데이터가 있을 때 data를 리턴, 반대는 data.data리턴
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetOneArticle;
