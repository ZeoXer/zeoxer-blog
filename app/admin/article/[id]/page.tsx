import { API_ENDPOINTS } from "@/data/client/endpoints";
import { getAuthTokenServer } from "@/data/server/token";
import axios from "axios";
import AdminArticleEdit from "./article-edit";
import { TArticle } from "@/types/article";
import { cache } from "react";
import { arrangeDateFormat } from "@/data/article";

interface PageProps {
  params: Promise<{ id: string }>;
}

const specialArticles: { [key: string]: TArticle } = {
  new: {
    id: 0,
    title: "新文章",
    categoryId: 0,
    content: "",
    excerpt: "這是一篇新文章。",
    createDate: "",
    lastUpdated: "",
  },
  error: {
    id: 0,
    title: "Article Not Found",
    categoryId: 0,
    content: "",
    excerpt: "The requested article could not be found.",
    createDate: "",
    lastUpdated: "",
  },
};

const fetchArticle = cache(
  async (id: string, token?: string): Promise<TArticle> => {
    if (id === "0") {
      return specialArticles.new;
    }

    try {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}${API_ENDPOINTS.GET_ARTICLE}/${id}`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );
      return {
        id: data.id,
        title: data.title,
        categoryId: data.category_id,
        content: data.content,
        excerpt: data.content.slice(0, 100) + "...",
        createDate: arrangeDateFormat(new Date(data.create_at)),
        lastUpdated: arrangeDateFormat(new Date(data.updated_at)),
        isPublished: data.is_published,
      };
    } catch (error) {
      console.error("Error fetching article for metadata:", error);
      return specialArticles.error;
    }
  }
);

export default async function AdminArticlePage({ params }: PageProps) {
  const { id } = await params;
  const token = await getAuthTokenServer();

  const article = await fetchArticle(id, token);

  return (
    <main>
      <AdminArticleEdit article={article} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const token = await getAuthTokenServer();

  const article = await fetchArticle(id, token);

  return {
    title: article.title,
    description: `${article.excerpt}`,
    icons: {
      icon: "/ZeoXer-blog.png",
    },
  };
}
