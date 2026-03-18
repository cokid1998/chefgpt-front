import { GET_MY_VOTE } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { Pagination } from "@/types/common";
import type { VoteType } from "@/types/voteType";
import { useQuery } from "@tanstack/react-query";

export type MyVoteType = Partial<VoteType> & {
  optionACount: number;
  optionBCount: number;
};

type MyVoteTypePagination = Pagination<MyVoteType[]>;

const useGetMyVote = (page: number, take: number = 5) => {
  return useQuery({
    queryKey: QUERY_KEYS.vote.my(page),
    queryFn: async () => {
      const res = await API.get<MyVoteTypePagination>(GET_MY_VOTE, {
        params: { page, take },
      });

      return {
        myVote: res.data.data,
        totalCount: res.data.totalCount,
        totalPage: res.data.totalPage,
      };
    },
  });
};

export default useGetMyVote;
