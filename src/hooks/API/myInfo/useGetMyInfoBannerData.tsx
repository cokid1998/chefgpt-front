import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import { GET_MYINFO_COUNT } from "@/constants/APIUrl";

interface GetMyInfoBannerDataRes {
  recipeCount: number;
  totalViewCount: number;
  totalLike: number;
  votePulls: number;
}

const useGetMyInfoBannerData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.count.myInfo,
    queryFn: () => API.get<GetMyInfoBannerDataRes>(GET_MYINFO_COUNT),
    select: (data) => data.data,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetMyInfoBannerData;
