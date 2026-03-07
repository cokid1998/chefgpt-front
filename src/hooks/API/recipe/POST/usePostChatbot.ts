import { POST_CHATBOT_RECIPE } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";

interface PostChatBotReq {
  message: string;
}

const usePostChatbot = () => {
  return useMutation({
    mutationFn: (payload: PostChatBotReq) =>
      API.post(POST_CHATBOT_RECIPE, payload),
  });
};

export default usePostChatbot;
