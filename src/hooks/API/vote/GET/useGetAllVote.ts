import { GET_VOTE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

const useGetAllVote = (status: "active" | "close") => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.list(status),
    queryFn: () =>
      API.get<VoteType[]>(GET_VOTE_API_URL, {
        params: { status },
      }),
    select: (data) => data.data,
  });
};

export default useGetAllVote;
