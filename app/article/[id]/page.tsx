"use client";

import { MainLayout } from "@/components/main-layout";
import { ArticleSeriesSidebar } from "@/components/article-series-sidebar";
import { ArticleTocSidebar } from "@/components/article-toc-sidebar";
import { ArticleContent } from "@/components/article-content";
import { getPublicArticle } from "@/data/article";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { TArticle } from "@/types/article";

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "ZeoXer";

export default function ArticlePage() {
  const id = +(useParams().id || 0);
  const [article, setArticle] = useState<TArticle>();

  useEffect(() => {
    fetchArticle(id);
  }, [id]);

  const arrangeDateFormat = (date: Date) => {
    const [year, month, day] = date.toLocaleDateString().split("/");
    return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
  };

  const fetchArticle = async (articleId: number) => {
    try {
      const { data } = await getPublicArticle(articleId, USER_NAME);
      const formattedArticle: TArticle = {
        id: data.id,
        categoryId: data.category_id,
        title: data.title,
        content: data.content,
        excerpt: data.content.slice(0, 100) + "...",
        lastUpdated: arrangeDateFormat(new Date(data.updated_at)),
      };
      setArticle(formattedArticle);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  return (
    <MainLayout
      leftSidebar={
        <ArticleSeriesSidebar
          categoryId={article?.categoryId}
          currentArticleId={id}
        />
      }
      rightSidebar={<ArticleTocSidebar article={article} />}
      lgLayoutRatio="lg:grid-cols-[20%_1fr_20%]"
    >
      <ArticleContent
        title={article?.title || ""}
        lastUpdated={article?.lastUpdated || ""}
        content={article?.content || ""}
      />
    </MainLayout>
  );
}
