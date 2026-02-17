import ArticleCard from "@/components/article/ArticleCard";
import useGetArticleCount from "@/hooks/API/article/GET/useGetArticleCount";
import ArticleCardSkeleton from "@/components/article/skeleton/ArticleCardSkeleton";
import { useState } from "react";

interface ArticleListProps {
  articleIds: number[];
  isArticleLoading: boolean;
  selectCategory: string;
}

export default function ArticleList({
  articleIds,
  isArticleLoading,
  selectCategory,
}: ArticleListProps) {
  const { data: articleCount } = useGetArticleCount();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectCategory} 정보
          <span className="ml-2 text-sm text-gray-500">
            {/* Todo: 무한 스크롤을 활용할려면 length를 사요하지않고 따로 API를 만들어야할듯 */}
            ({articleIds.length}개)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {isArticleLoading
          ? [...Array(3)].map((_, i) => <ArticleCardSkeleton key={i} />)
          : articleIds.map((id) => {
              return <ArticleCard key={id} articleId={id} />;
            })}
      </div>
    </div>
  );
}
