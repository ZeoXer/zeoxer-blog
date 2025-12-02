"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { ArticleSeriesSidebar } from "@/components/article-series-sidebar";
import { ArticleTocSidebar } from "@/components/article-toc-sidebar";
import { ArticleContent } from "@/components/article-content";
import { TArticle } from "@/types/article";
import { BackToTop } from "@/components/back-to-top";
import { getArticleCategoryById } from "@/data/article";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { DocumentIcon, FolderIcon, HomeIcon } from "@/components/icons";
import { Divider } from "@heroui/divider";

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

export default function ArticleDisplay({ article }: { article: TArticle }) {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (article) {
      fetchCurrentCategory(article.categoryId);
    }
  }, [article]);

  const fetchCurrentCategory = async (categoryId: number) => {
    try {
      const { data } = await getArticleCategoryById(USER_NAME, categoryId);
      setCategoryName(data.category_name);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
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
            currentArticleId={article.id}
          />
        }
        rightSidebar={<ArticleTocSidebar article={article} />}
        lgLayoutRatio="lg:grid-cols-[20%_1fr_20%]"
      >
        <ArticleContent
          title={article?.title || ""}
          createDate={article?.createDate || ""}
          lastUpdated={article?.lastUpdated || ""}
          content={article?.content || ""}
        />
      </MainLayout>
      <BackToTop />
    </>
  );
}
