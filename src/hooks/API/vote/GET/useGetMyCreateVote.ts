import { GET_MY_VOTE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

export type MyVoteType = Partial<VoteType> & {
  optionACount: number;
  optionBCount: number;
};

const useGetMyVote = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.my,
    queryFn: () => API.get<MyVoteType[]>(GET_MY_VOTE),
    select: (data) => data.data,
  });
};

export default useGetMyVote;
