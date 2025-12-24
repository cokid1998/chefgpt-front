import { GET_ACTIVE_VOTE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

const useGetActiveVote = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.active,
    queryFn: () => API.get<VoteType[]>(GET_ACTIVE_VOTE_API_URL),
    select: (data) => data.data,
  });
};

export default useGetActiveVote;
