import useGetOneArticle from "@/hooks/API/article/GET/useGetOneArticle";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Calendar, Tag } from "lucide-react";
import { ARTICLE } from "@/constants/Url";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import DOMPurify from "dompurify";

export default function ArticleDetailPage() {
  const nav = useNavigate();
  const { articleId } = useParams();

  const { data: article, isLoading: isArticleLoading } = useGetOneArticle(
    Number(articleId),
  );

  const safeContentHTML = DOMPurify.sanitize(article?.content ?? "");

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 transition-all hover:bg-gray-100"
          onClick={() => nav(ARTICLE)}
        >
          <ArrowLeft className="mr-2 size-5" />
          목록으로
        </Button>

        <article className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg">
          <div className="p-8">
            <div className="mb-6">
              <Badge className="mb-4 rounded-md border-0 bg-green-500 px-4 py-1 text-base text-white shadow">
                {article?.category.name}
              </Badge>

              <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
                {article?.title}
              </h1>

              {article?.summary && (
                <p className="text-xl leading-relaxed text-gray-600">
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
              <div dangerouslySetInnerHTML={{ __html: safeContentHTML }} />
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
