import { CREATE_VOTE_SUBMIT_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePostSubmitVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      voteId,
      optionName,
    }: {
      voteId: number;
      optionName: string;
    }) =>
      API.post(CREATE_VOTE_SUBMIT_API_URL(voteId), {
        voteId,
        selectOption: optionName,
      }),
    onSuccess: () => {
      // 투표 개수 캐싱 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count.vote });
      // 투표 리스트 캐싱 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vote.all });
      // 내가 참여한 투표 캐싱 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count.myInfo });
    },
    onError: (error: any) => {
      toast.warning("이미 투표한 옵션입니다.");
    },
  });
};

export default usePostSubmitVote;
