export interface ArticleCategory {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  readingTime: number;
  viewCount: number;
}
