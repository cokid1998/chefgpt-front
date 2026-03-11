import useGetOneArticle from "@/hooks/API/article/GET/useGetOneArticle";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Calendar, Tag, Heart } from "lucide-react";
import { ARTICLE } from "@/constants/Url";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import EditorViewer from "@/components/article/editor/EditorViewer";
import usePostArticleToggleLike from "@/hooks/API/article/POST/usePostArticleToggleLike";

export default function ArticleDetailPage() {
  const nav = useNavigate();
  const { articleId } = useParams();

  const { data: article, isLoading: isArticleLoading } = useGetOneArticle(
    Number(articleId),
  );
  const { mutate: likeToggle } = usePostArticleToggleLike();

  // Skeleton처리
  if (!article || isArticleLoading) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 hidden transition-all hover:bg-gray-100 md:flex"
          onClick={() => nav(ARTICLE)}
        >
          <ArrowLeft className="mr-2 size-5" />
          목록으로
        </Button>

        <article className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">
          <div className="p-4 md:p-8">
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <Badge className="rounded-md border-0 bg-green-500 px-4 py-1 text-base text-white shadow">
                  {article?.category.name}
                </Badge>

                <Button
                  variant="outline"
                  onClick={() => likeToggle(Number(articleId))}
                  className={`border ${
                    article?.liked
                      ? "border-red-200 text-red-500 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${article?.liked ? "fill-red-500 stroke-red-500" : ""}`}
                  />
                  {article?.likeCount}
                </Button>
              </div>

              <h1 className="mb-4 text-2xl leading-tight font-bold text-gray-900 md:text-4xl">
                {article?.title}
              </h1>

              {article?.summary && (
                <p className="text-base leading-relaxed text-gray-600 md:text-xl">
                  {article.summary}
                </p>
              )}
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">{article?.readingTime} 분</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="h-4 w-4 text-green-500" />
                <span className="text-sm">{article?.viewCount || 0} 조회</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  {dayjs(article?.createdAt).format("YYYY년 MM월 DD일")}
                </span>
              </div>
            </div>

            <div>
              <EditorViewer content={article?.contentJSON} />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                {article?.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="rounded-md border-green-200 text-green-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
