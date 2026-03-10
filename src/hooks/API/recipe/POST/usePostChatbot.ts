import { POST_CHATBOT_RECIPE } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import type { ChatbotRecipe } from "@/types/recipeType";

interface PostChatBotReq {
  message: string;
}

interface PostChatBotRes {
  message: string;
  recipe: ChatbotRecipe;
}

const usePostChatbot = () => {
  return useMutation({
    mutationFn: (payload: PostChatBotReq) =>
      API.post<PostChatBotRes>(POST_CHATBOT_RECIPE, payload),
  });
};

export default usePostChatbot;
