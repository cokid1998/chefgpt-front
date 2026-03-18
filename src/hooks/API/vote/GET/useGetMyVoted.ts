import API from "@/hooks/API/API";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import { GET_MY_VOTED } from "@/constants/APIUrl";
import type { VoteOption, VoteType } from "@/types/voteType";
import type { Pagination } from "@/types/common";

export type VotedType = Pick<
  VoteType,
  "id" | "title" | "description" | "participantsCount" | "startDate"
> & { selectedOptionName: string; selectedOption: VoteOption };

type MyVotedTypePagination = Pagination<VotedType[]>;

/**
 * 내가 참여한 투표 리스트
 */
const useGetMyVoted = (enabled: boolean, page: number, take: number = 5) => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.voted(page),
    queryFn: async () => {
      const res = await API.get<MyVotedTypePagination>(GET_MY_VOTED, {
        params: { page, take },
      });

      return {
        myVoted: res.data.data,
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
    enabled,
  });
};

export default useGetMyVoted;
