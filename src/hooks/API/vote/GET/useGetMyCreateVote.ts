import { GET_MY_VOTE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

export type MyCreatedVote = Partial<VoteType> & {
  optionACount: number;
  optionBCount: number;
};

const useGetMyCreateVote = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.myCreate,
    queryFn: () => API.get<MyCreatedVote[]>(GET_MY_VOTE),
    select: (data) => data.data,
  });
};

export default useGetMyCreateVote;
