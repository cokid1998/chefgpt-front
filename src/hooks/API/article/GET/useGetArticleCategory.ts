import { GET_ARTICLE_CATEOGRY_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { ArticleCategory } from "@/types/articleType";

const useGetArticleCategory = () => {
  return useQuery({
    queryKey: QUERY_KEYS.category.article,
    queryFn: () => API.get<ArticleCategory[]>(GET_ARTICLE_CATEOGRY_API_URL),
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });
};

export default useGetArticleCategory;
