import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Tag } from "lucide-react";
import { Link } from "react-router";
import { ARTICLE } from "@/constants/Url";
import usePatchViewCount from "@/hooks/API/article/PATCH/usePatchViewCount";
import useGetOneArticle from "@/hooks/API/article/GET/useGetOneArticle";

interface ArticleCardProps {
  articleId: number;
}

export default function ArticleCard({ articleId }: ArticleCardProps) {
  const { mutate: articleViewCountSubmit } = usePatchViewCount();

  const { data: article } = useGetOneArticle(articleId);

  return (
    <Link
      to={`${ARTICLE}/${articleId}`}
      className="group cursor-pointer rounded-xl border border-green-100 bg-white p-6 shadow transition-all duration-300 hover:border-green-300 hover:shadow-xl"
      onClick={() => articleViewCountSubmit(articleId)}
    >
      <Badge className="mb-3 rounded-md bg-green-100 px-2.5 font-semibold text-green-600 shadow">
        {article?.category.name}
      </Badge>

      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-500">
        {article?.title}
      </h3>

      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
        {article?.summary}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{article?.readingTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{article?.viewCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tag className="h-3 w-3" />
          <span className="text-xs">{article?.tags.length}</span>
        </div>
      </div>
    </Link>
  );
}
