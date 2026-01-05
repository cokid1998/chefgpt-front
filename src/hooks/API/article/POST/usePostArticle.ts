import { POST_ARTICLE } from "@/constants/APIUrl";
import { ARTICLE } from "@/constants/Url";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface PostArticleReq {
  title: string;
  summary: string;
  categoryId: number;
  tags: string[];
  contentJSON: string;
  contentText: string;
}

const usePostArticle = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (payload: PostArticleReq) => API.post(POST_ARTICLE, payload),
    onSuccess: () => {
      toast.success("글이 추가됐습니다.");
      nav(ARTICLE);
    },
  });
};

export default usePostArticle;
