import { GET_LIKED_ARTICLE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { Article } from "@/types/articleType";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetLikedArticle = (enabled: boolean) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.article.liked,
    queryFn: async () => {
      const res = await API.get<Article[]>(GET_LIKED_ARTICLE);

      res.data.forEach((likedArticle) => {
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(likedArticle.id),
          likedArticle,
        );
      });

      return res.data.map((likedArticle) => likedArticle.id);
    },
    enabled,
  });
};

export default useGetLikedArticle;
