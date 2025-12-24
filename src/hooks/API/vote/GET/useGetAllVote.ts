import { GET_VOTE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { VoteType } from "@/types/voteType";

const useGetAllVote = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.list,
    queryFn: () => API.get<VoteType[]>(GET_VOTE_API_URL),
    select: (data) => data.data,
  });
};

export default useGetAllVote;
