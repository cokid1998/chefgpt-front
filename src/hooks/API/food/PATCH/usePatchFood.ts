import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_FOOD_API_URL } from "@/constants/APIUrl";
import { useCloseModal } from "@/store/modalStore";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { toast } from "sonner";
import type { FoodType } from "@/types/refrigeratorType";

interface PatchFoodReq
  extends Omit<FoodType, "id" | "category" | "expiration_date"> {
  categoryId: number;
  expiration_date: string;
}

const usePatchFood = () => {
  const queryClient = useQueryClient();
  const closeModal = useCloseModal();

  return useMutation({
    mutationFn: ({
      foodId,
      payload,
    }: {
      foodId: number;
      payload: PatchFoodReq;
    }) => API.patch(UPDATE_FOOD_API_URL(foodId), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.all });
      /**
       * 1. PATCH요청 성공
       * 2. QUERY_KEYS.food.all무효화
       * 3. category에 맞게 다시 refetch(useGetAllFood.ts)
       */
      closeModal();
      toast.success("변경되었습니다.");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default usePatchFood;
