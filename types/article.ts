export type ArticleCategory = {
  id: number;
  username: string;
  category_name: string;
};

export type Article = {
  id: number;
  username: string;
  title: string;
  content: string;
  category_id: number;
  create_at: string;
  updated_at: string;
  is_published: boolean;
};

export type ArticleAnalysis = {
  article_amount: number;
  article_category_amount: number;
};

export type TCategory = {
  id: number;
  name: string;
  icon?: React.ReactNode;
};

export type TArticle = {
  id: number;
  categoryId: number;
  title: string;
  excerpt: string;
  content: string;
  isPublished?: boolean;
  createDate: string;
  lastUpdated: string;
};
