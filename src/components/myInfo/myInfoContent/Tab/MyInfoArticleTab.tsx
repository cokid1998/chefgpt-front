import ArticleCard from "@/components/article/ArticleCard";
import ArticleCardSkeleton from "@/components/article/skeleton/ArticleCardSkeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetLikedArticle from "@/hooks/API/article/GET/useGetLikedArticle";
import useGetMyArticle from "@/hooks/API/article/GET/useGetMyArticle";
import { useSearchParams, Link } from "react-router";
import {} from "lucide-react";
import { ARTICLE_CREATE_URL } from "@/constants/Url";
import { BookOpen, Heart } from "lucide-react";

const MY_ARTICLE_TYPE = {
  MY: { LABEL: "내 요리정보", VALUE: "my" },
  LIKED: { LABEL: "좋아요 누른 요리정보", VALUE: "liked" },
};

interface MyInfoArticleTabProps {
  curTab: string;
}

export default function MyInfoArticleTab({ curTab }: MyInfoArticleTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curSelect = searchParams.get("select") ?? MY_ARTICLE_TYPE.MY.VALUE;
  const isMyArticle = curSelect === MY_ARTICLE_TYPE.MY.VALUE;

  const handleSelectChange = (value: string) => {
    setSearchParams({ tab: curTab, select: value });
  };

  const { data: myArticleIdList, isLoading: isMyArticleLoading } =
    useGetMyArticle();
  const { data: likedArticleIdList, isLoading: isLikedArticleLoading } =
    useGetLikedArticle(curSelect === MY_ARTICLE_TYPE.LIKED.VALUE);

  const curLabel = isMyArticle
    ? MY_ARTICLE_TYPE.MY.LABEL
    : MY_ARTICLE_TYPE.LIKED.LABEL;
  const curList = isMyArticle ? myArticleIdList : likedArticleIdList;
  const isLoading = isMyArticle ? isMyArticleLoading : isLikedArticleLoading;

  const renderList = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ));
    }

    return curList?.map((articleId) => (
      <ArticleCard key={articleId} articleId={articleId} />
    ));
  };

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex justify-between space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        {curLabel}({curList?.length ?? 0}개)
        <Select
          value={curSelect}
          onValueChange={(value) => handleSelectChange(value)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MY_ARTICLE_TYPE.MY.VALUE}>
              {MY_ARTICLE_TYPE.MY.LABEL}
            </SelectItem>
            <SelectItem value={MY_ARTICLE_TYPE.LIKED.VALUE}>
              {MY_ARTICLE_TYPE.LIKED.LABEL}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-6 pt-0">
        {!isLoading && curList?.length === 0 ? (
          <EmptyArticle isMyArticle={isMyArticle} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {renderList()}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyArticle({ isMyArticle }: { isMyArticle: boolean }) {
  return (
    <div className="py-12 text-center">
      {isMyArticle ? (
        <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      ) : (
        <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      )}

      <p className="mb-4 text-gray-500">
        {isMyArticle
          ? "작성한 요리정보가 없습니다."
          : "좋아요를 누른 요리정보가 없습니다."}
      </p>
      {isMyArticle ? (
        <Link
          to={ARTICLE_CREATE_URL}
          className="text-primary-foreground inline-flex h-9 items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-600"
        >
          요리정보 작성하기
        </Link>
      ) : null}
    </div>
  );
}
