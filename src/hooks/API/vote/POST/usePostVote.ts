import { CREATE_VOTE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import type { VoteType } from "@/types/voteType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type PostVotePayload = Omit<VoteType, "id">;

const usePostVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostVotePayload) =>
      API.post(CREATE_VOTE_API_URL, payload),
    onSuccess: () => {
      // 새로운 투표가 생성되면 기존 캐싱된 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vote.active });
      // Todo: 투표 카운트 캐싱 데이터 refetch
      // queryClient.invalidateQueries({queryKey: QUERY_KEYS.count.})
      toast.success("투표가 생성됐습니다.");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default usePostVote;
