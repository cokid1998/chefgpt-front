export interface ArticleCategory {
  id: number;
  name: string;
}

export interface Article {
  userId: number;
  id: number;
  createdAt: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  readingTime: number;
  viewCount: number;
  tags: string[];
  contentJSON: string;
  liked: boolean;
  likeCount: number;
}
