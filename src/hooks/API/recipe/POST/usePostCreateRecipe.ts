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
  thumbnailImageFile?: File | null;
}

const usePostCreateRecipe = () => {
  return useMutation({
    mutationFn: (payload: PostCreateRecipeReq) => {
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        // 이미지 파일
        if (value instanceof File) {
          formData.append(key, value);
          return;
        }

        // 배열, 객체
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
          return;
        }

        // string, number
        formData.append(key, value);
      });

      return API.post(POST_CREATE_RECIPE, formData);
    },
  });
};

export default usePostCreateRecipe;
