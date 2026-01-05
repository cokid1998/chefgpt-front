import { POST_ARTICLE } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";

export interface PostArticleReq {
  title: string;
  summary: string;
  categoryId: number;
  tags: string[];
  contentJSON: string;
}

const usePostArticle = () => {
  return useMutation({
    mutationFn: (payload: PostArticleReq) => API.post(POST_ARTICLE, payload),
  });
};

export default usePostArticle;
