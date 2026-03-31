import { POST_ARTICLE } from "@/constants/APIUrl";
import { ARTICLE } from "@/constants/Url";
import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { Article } from "@/types/articleType";
import { QUERY_KEYS } from "@/constants/QueryKeys";

export interface PostArticleReq {
  title: string;
  summary: string;
  categoryId: number;
  tags: string[];
  contentJSON: string;
  contentText: string;
}

const usePostArticle = () => {
  const queryClient = useQueryClient();

  const nav = useNavigate();
  return useMutation({
    mutationFn: (payload: PostArticleReq) =>
      API.post<Article>(POST_ARTICLE, payload),
    onSuccess: (data) => {
      const articleId = data.data.id;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.article.all });

      toast.success("글이 추가됐습니다.");
      nav(`${ARTICLE}/${articleId}`);
    },
  });
};

export default usePostArticle;
