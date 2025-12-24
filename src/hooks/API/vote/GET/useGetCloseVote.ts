import { GET_CLOSE_VOTE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

const useGetCloseVote = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.close,
    queryFn: () => API.get<VoteType[]>(GET_CLOSE_VOTE_API_URL),
    select: (data) => data.data,
  });
};

export default useGetCloseVote;
