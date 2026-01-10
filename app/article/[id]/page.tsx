import {
  arrangeDateFormat,
  getArticleCategoryById,
  getPublicArticle,
  getPublicArticlesByCategory,
} from "@/data/article";
import ArticleDisplay from "./article-display";
import { TArticle } from "@/types/article";
import { cache } from "react";
import MarkdownDisplay from "@/components/markdown-display";

export const revalidate = 0;
const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

interface PageProps {
  params: Promise<{ id: string }>;
}

const fetchArticle = cache(async (id: number): Promise<TArticle> => {
  try {
    const { data } = await getPublicArticle(id, "ZeoXer");
    return {
      id: data.id,
      title: data.title,
      categoryId: data.category_id,
      content: data.content,
      excerpt: data.content.slice(0, 100) + "...",
      createDate: arrangeDateFormat(new Date(data.create_at)),
      lastUpdated: arrangeDateFormat(new Date(data.updated_at)),
    };
  } catch (error) {
    console.error("Error fetching article for metadata:", error);
    return {
      id: 0,
      title: "Article Not Found",
      categoryId: 0,
      content: "",
      excerpt: "The requested article could not be found.",
      createDate: "",
      lastUpdated: "",
    };
  }
});

const fetchCurrentCategory = cache(
  async (categoryId: number): Promise<string> => {
    try {
      const { data } = await getArticleCategoryById(USER_NAME, categoryId);
      return data.category_name;
    } catch (error) {
      console.error("Error fetching category:", error);
      return "未知分類";
    }
  }
);

const fetchAllArticlesByCategory = cache(
  async (categoryId: number): Promise<TArticle[]> => {
    let page = 1;
    let totalPages: number | null = null;
    const articles: TArticle[] = [];

    while (!totalPages || page <= totalPages) {
      try {
        const { data } = await getPublicArticlesByCategory(
          categoryId,
          USER_NAME,
          page
        );
        totalPages = data.total_page;
        const formattedArticles = data.articles.map((article) => ({
          id: article.id,
          categoryId: article.category_id,
          title: article.title,
          content: article.content,
          excerpt: article.content.slice(0, 100) + "...",
          createDate: arrangeDateFormat(new Date(article.create_at)),
          lastUpdated: arrangeDateFormat(new Date(article.updated_at)),
        }));
        articles.push(...formattedArticles);
        page += 1;
      } catch (error) {
        console.error("Error fetching articles by category ID:", error);
        break;
      }
    }

    return articles;
  }
);

const getArticleMarkdownContent = cache((content: string) => {
  return <MarkdownDisplay content={content} />;
});

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  const article = await fetchArticle(+id);
  const categoryName = await fetchCurrentCategory(article.categoryId);
  const allArticlesInCategory = await fetchAllArticlesByCategory(
    article.categoryId
  );

  return (
    <main>
      <ArticleDisplay
        article={article}
        allArticlesInCategory={allArticlesInCategory}
        categoryName={categoryName}
        markdownContent={getArticleMarkdownContent(article.content)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Article",
            headline: article.title,
            url: "https://blog.zeoxer.com/article/" + id,
            dateModified: article.lastUpdated,
            author: { "@type": "Person", name: "ZeoXer" },
          }),
        }}
      />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const article = await fetchArticle(+id);

  return {
    title: article.title,
    description: `${article.excerpt}`,
    icons: {
      icon: "/ZeoXer-blog.png",
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: "https://blog.zeoxer.com/article/" + id,
      siteName: "ZeoXer's Blog",
    },
  };
}
