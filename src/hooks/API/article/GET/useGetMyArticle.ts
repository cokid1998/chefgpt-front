import API from "@/hooks/API/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { GET_MY_ARTICLE } from "@/constants/APIUrl";
import type { Article } from "@/types/articleType";

const useGetMyArticle = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.article.myCreate,
    queryFn: async () => {
      const myArticles = await API.get<Article[]>(GET_MY_ARTICLE);

      myArticles.data.forEach((myArticle) =>
        queryClient.setQueryData(
          QUERY_KEYS.article.byId(myArticle.id),
          myArticle,
        ),
      );

      return myArticles.data.map((myArticle) => myArticle.id);
    },
  });
};

export default useGetMyArticle;
