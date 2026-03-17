import ArticleCard from "@/components/article/ArticleCard";
import useGetArticleCount from "@/hooks/API/article/GET/useGetArticleCount";
import ArticleCardSkeleton from "@/components/article/skeleton/ArticleCardSkeleton";
import useListParams from "@/hooks/useListParams";
import useGetAllArticle from "@/hooks/API/article/GET/useGetAllArticle";

export default function ArticleList() {
  const { categoryName, search, page } = useListParams();

  const { data: articleCount } = useGetArticleCount();

  const { data: articleData, isLoading: isArticleLoading } = useGetAllArticle(
    categoryName,
    search,
    page,
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {categoryName} 정보
          <span className="ml-2 text-sm text-gray-500">({articleCount}개)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {isArticleLoading
          ? [...Array(9)].map((_, i) => <ArticleCardSkeleton key={i} />)
          : articleData?.articleIds.map((id) => {
              return <ArticleCard key={id} articleId={id} />;
            })}
      </div>
    </div>
  );
}
