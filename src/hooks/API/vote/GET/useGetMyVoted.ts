import API from "@/hooks/API/API";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import { GET_MY_VOTED } from "@/constants/APIUrl";

/**
 * 내가 참여한 투표 리스트
 */
const useGetMyVoted = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.myVoted,
    queryFn: () => API.get(GET_MY_VOTED),
    select: (data) => data.data,
  });
};

export default useGetMyVoted;
