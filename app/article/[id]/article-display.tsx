"use client";

import { MainLayout } from "@/components/main-layout";
import { ArticleSeriesSidebar } from "@/components/article-series-sidebar";
import { ArticleTocSidebar } from "@/components/article-toc-sidebar";
import { TArticle } from "@/types/article";
import { BackToTop } from "@/components/back-to-top";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import {
  ClockIcon,
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  PenIcon,
} from "@/components/icons";

interface ArticleDisplayProps {
  article: TArticle;
  categoryName: string;
  allArticlesInCategory: TArticle[];
  markdownContent: React.ReactNode;
}

export default function ArticleDisplay({
  article,
  categoryName,
  allArticlesInCategory,
  markdownContent,
}: ArticleDisplayProps) {
  return (
    <>
      <Breadcrumbs underline="hover">
        <BreadcrumbItem startContent={<HomeIcon className="w-5" />} href="/">
          首頁
        </BreadcrumbItem>
        <BreadcrumbItem startContent={<FolderIcon className="w-5" />}>
          {categoryName}
        </BreadcrumbItem>
        <BreadcrumbItem startContent={<DocumentIcon className="w-5" />}>
          {article.title}
        </BreadcrumbItem>
      </Breadcrumbs>
      <MainLayout
        leftSidebar={
          <ArticleSeriesSidebar
            categoryName={categoryName}
            allArticles={allArticlesInCategory}
            currentArticleId={article.id}
          />
        }
        rightSidebar={<ArticleTocSidebar article={article} />}
        lgLayoutRatio="lg:grid-cols-[20%_1fr_20%]"
      >
        <article className="w-full max-w-2xl">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-warning">
              {article.title}
            </h1>
            <div className="grid grid-cols-1 gap-2">
              <time className="text-sm text-default-500 flex gap-1 items-center">
                <PenIcon className="w-5 inline-block" />
                撰寫時間 {article.createDate}
              </time>
              <time className="text-sm text-default-500 flex gap-1 items-center">
                <ClockIcon className="w-5 inline-block" />
                最後更新 {article.lastUpdated}
              </time>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-default-700 leading-relaxed">
              {markdownContent}
            </div>
          </div>
        </article>
      </MainLayout>
      <BackToTop />
    </>
  );
}
