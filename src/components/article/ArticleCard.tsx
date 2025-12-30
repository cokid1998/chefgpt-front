import type { Article } from "@/types/articleType";

export default function ArticleCard({
  id,
  title,
  summary,
  content,
  category,
}: Article) {
  return (
    <div>
      {id}
      <br />
      {title}
      <br />
      {summary}
      <br />
      {content}
      <br />
      {category.name}
    </div>
  );
}
