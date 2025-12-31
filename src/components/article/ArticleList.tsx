import ArticleCard from "@/components/article/ArticleCard";
import useGetArticleCount from "@/hooks/API/article/GET/useGetArticleCount";
import type { Article } from "@/types/articleType";

interface ArticleListProps {
  articleList: Article[];
}

export default function ArticleList({ articleList }: ArticleListProps) {
  const { data: articleCount } = useGetArticleCount();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          모든 아티클
          <span className="ml-2 text-sm text-gray-500">
            {/* Todo: 무한 스크롤을 활용할려면 length를 사요하지않고 따로 API를 만들어야할듯 */}
            ({articleCount}개)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {articleList.map((item) => {
          return <ArticleCard key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}
