import { API_ENDPOINTS } from "@/data/client/endpoints";
import { getAuthTokenServer } from "@/data/server/token";
import axios from "axios";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}

const errorArticle = {
  id: 0,
  title: "Article Not Found",
  content: "",
  excerpt: "The requested article could not be found.",
  lastUpdated: "",
};

const newArticle = {
  id: 0,
  title: "新文章",
  content: "",
  excerpt: "這是一篇新文章。",
  lastUpdated: "",
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const token = await getAuthTokenServer();

  const fetchArticle = async () => {
    if (id === "0") {
      return newArticle;
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
        content: data.content,
        excerpt: data.content.slice(0, 100) + "...",
        lastUpdated: new Date(data.updated_at).toLocaleDateString(),
      };
    } catch (error) {
      console.error("Error fetching article for metadata:", error);
      return errorArticle;
    }
  };

  const article = await fetchArticle();

  return {
    title: article.title,
    description: `${article.excerpt}`,
    icons: {
      icon: "/zeoxers-blog-logo-transparent.svg",
    },
  };
}
