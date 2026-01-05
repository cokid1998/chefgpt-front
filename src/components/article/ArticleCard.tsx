import type { Article } from "@/types/articleType";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Tag } from "lucide-react";
import { Link } from "react-router";
import { ARTICLE } from "@/constants/Url";

export default function ArticleCard({
  id,
  title,
  summary,
  content,
  category,
  readingTime,
  viewCount,
  tags,
}: Article) {
  return (
    <Link
      to={`${ARTICLE}/${id}`}
      className="group cursor-pointer rounded-xl border border-green-100 bg-white p-6 shadow transition-all duration-300 hover:border-green-300 hover:shadow-xl"
    >
      <Badge className="mb-3 rounded-md bg-green-100 px-2.5 font-semibold text-green-600 shadow">
        {category.name}
      </Badge>

      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-500">
        {title}
      </h3>

      <p className="mb-4 line-clamp-3 text-sm text-gray-600">{summary}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{viewCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tag className="h-3 w-3" />
          <span className="text-xs">{tags.length}</span>
        </div>
      </div>
    </Link>
  );
}
