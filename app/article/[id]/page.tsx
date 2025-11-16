"use client";

import { MainLayout } from "@/components/main-layout";
import { ArticleSeriesSidebar } from "@/components/article-series-sidebar";
import { ArticleTocSidebar } from "@/components/article-toc-sidebar";
import { ArticleContent } from "@/components/article-content";
import { TArticle } from "@/types/article";
import { useLoading } from "@/app/use-loading";

export default function ArticlePage({ article }: { article: TArticle }) {
  return (
    <MainLayout
      leftSidebar={
        <ArticleSeriesSidebar
          categoryId={article?.categoryId}
          currentArticleId={article.id}
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
