import { CREATE_FOOD_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useCloseModal } from "@/store/modalStore";
import type { FoodType } from "@/types/refrigeratorType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PostFoodReq extends Omit<FoodType, "id" | "category"> {
  categoryId: number;
}

const usePostFood = () => {
  const queryClient = useQueryClient();
  const closeModal = useCloseModal();
  return useMutation({
    mutationFn: (payload: PostFoodReq) =>
      API.post(CREATE_FOOD_API_URL, payload),
    onSuccess: () => {
      // 원래 음식 캐시 무효화하고 refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.all });
      // 모달 닫기
      closeModal();
    },
    onError: (error: any) => {
      // 에러 메시지 toast로 보여줌
      toast.error(error.response.data.message);
    },
  });
};

export default usePostFood;
