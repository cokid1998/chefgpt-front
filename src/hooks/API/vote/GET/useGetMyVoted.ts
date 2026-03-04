import API from "@/hooks/API/API";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import { GET_MY_VOTED } from "@/constants/APIUrl";
import type { VoteOption, VoteType } from "@/types/voteType";

export type VotedType = Pick<
  VoteType,
  "id" | "title" | "description" | "participantsCount" | "startDate"
> & { selectedOptionName: string; selectedOption: VoteOption };

/**
 * 내가 참여한 투표 리스트
 */
const useGetMyVoted = (enabled: boolean) => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.voted,
    queryFn: () => API.get<VotedType[]>(GET_MY_VOTED),
    select: (data) => data.data,
    enabled,
  });
};

export default useGetMyVoted;
