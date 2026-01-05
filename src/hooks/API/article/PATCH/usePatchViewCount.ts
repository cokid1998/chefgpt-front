import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { PATCH_ARTICLE_VIEWCOUNT } from "@/constants/APIUrl";

const usePatchViewCount = () => {
  return useMutation({
    mutationFn: (articleId: number) =>
      API.patch(PATCH_ARTICLE_VIEWCOUNT(articleId)),
  });
};

export default usePatchViewCount;
