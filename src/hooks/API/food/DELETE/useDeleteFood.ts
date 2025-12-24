import { DELETE_FOOD_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (foodId: number) => API.delete(DELETE_FOOD_API_URL(foodId)),
    onSuccess: () => {
      // 삭제가 완료되면 캐싱된 음식 리스트 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.all });
      // 삭제가 완료되면 캐싱된 count관련 데이터 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count.food });

      toast.success("삭제되었습니다.");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useDeleteFood;
