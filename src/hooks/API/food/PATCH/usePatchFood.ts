import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_FOOD_API_URL } from "@/constants/APIUrl";
import { useCloseModal } from "@/store/modalStore";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { toast } from "sonner";
import type { FoodType } from "@/types/refrigeratorType";

interface PatchFoodReq extends Partial<FoodType> {}

const usePatchFood = () => {
  const queryClient = useQueryClient();
  const closeModal = useCloseModal();

  return useMutation({
    mutationFn: (payload: PatchFoodReq) =>
      API.patch(UPDATE_FOOD_API_URL, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.foods });
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default usePatchFood;
