import { CREATE_VOTE_SUBMIT_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
    onError: () => {},
  });
};

export default usePostSubmitVote;
