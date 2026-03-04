import ArticleCard from "@/components/article/ArticleCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetMyArticle from "@/hooks/API/article/GET/useGetMyArticle";
import { useSearchParams } from "react-router";

const MY_ARTICLE_TYPE = {
  CREATED: { LABEL: "내 요리정보", VALUE: "created" },
  LIKED: { LABEL: "좋아요 누른 요리정보", VALUE: "liked" },
};

interface MyInfoArticleTabProps {
  curTab: string;
}

export default function MyInfoArticleTab({ curTab }: MyInfoArticleTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curSelect = searchParams.get("select") ?? MY_ARTICLE_TYPE.CREATED.VALUE;

  const handleSelectChange = (value: string) => {
    setSearchParams({ tab: curTab, select: value });
  };

  const { data: myArticleIds } = useGetMyArticle();

  // Skeleton loading처리

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex justify-between space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        {MY_ARTICLE_TYPE.CREATED.LABEL}({myArticleIds?.length}개)
        <Select
          value={curSelect}
          onValueChange={(value) => handleSelectChange(value)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MY_ARTICLE_TYPE.CREATED.VALUE}>
              {MY_ARTICLE_TYPE.CREATED.LABEL}
            </SelectItem>
            <SelectItem value={MY_ARTICLE_TYPE.LIKED.VALUE}>
              {MY_ARTICLE_TYPE.LIKED.LABEL}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myArticleIds?.map((articleId) => (
            <ArticleCard articleId={articleId} />
          ))}
        </div>
      </div>
    </div>
  );
}
