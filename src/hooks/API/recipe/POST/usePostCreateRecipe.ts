import { POST_CREATE_RECIPE } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";

interface PostCreateRecipeReq {
  title: string;
  description: string;
  categoryId: number;
  cookingTime: string;
  ingredients: { name: string; amount: string }[];
  steps: {
    stepNumber: number;
    stepTitle: string;
    tip: string;
    description: string;
  }[];
}

const usePostCreateRecipe = () => {
  return useMutation({
    mutationFn: (payload: PostCreateRecipeReq) =>
      API.post(POST_CREATE_RECIPE, payload),
  });
};

export default usePostCreateRecipe;
