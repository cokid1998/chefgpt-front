import API from "@/hooks/API/API";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import { GET_MY_VOTED } from "@/constants/APIUrl";
import type { VoteOption, VoteType } from "@/types/voteType";

export type MyVotedType = Pick<
  VoteType,
  "id" | "title" | "description" | "participantsCount" | "startDate"
> & { selectedOptionName: string; selectedOption: VoteOption };

/**
 * 내가 참여한 투표 리스트
 */
const useGetMyVoted = () => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.myVoted,
    queryFn: () => API.get<MyVotedType[]>(GET_MY_VOTED),
    select: (data) => data.data,
  });
};

export default useGetMyVoted;
