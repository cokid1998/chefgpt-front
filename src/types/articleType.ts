export interface ArticleCategory {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  createdAt: string;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  readingTime: number;
  viewCount: number;
  tags: string[];
  contentJSON: string;
}
