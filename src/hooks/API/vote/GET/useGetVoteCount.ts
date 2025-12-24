import { GET_VOTE_COUNT_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";

interface GetVoteCountRes {
  totalVoteCount: number;
  activeVoteCount: number;
  totalParticipants: number;
}

const useGetVoteCount = () => {
  return useQuery({
    queryKey: QUERY_KEYS.count.vote,
    queryFn: () => API.get<GetVoteCountRes>(GET_VOTE_COUNT_API_URL),
    select: (data) => data.data,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export default useGetVoteCount;
