import { GET_ARTICLE_COUNT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";

const useGetArticleCount = () => {
  return useQuery({
    queryKey: QUERY_KEYS.count.article,
    queryFn: () => API.get(GET_ARTICLE_COUNT),
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000,
  });
};

export default useGetArticleCount;
