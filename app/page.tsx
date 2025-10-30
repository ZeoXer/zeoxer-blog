"use client";

import { MainBanner } from "@/components/main-banner";
import {
  CategorySidebar,
  MobileCategorySidebar,
} from "@/components/category-sidebar";
import { BlogPostList } from "@/components/blog-post-list";
import { MainLayout } from "@/components/main-layout";
import { FolderIcon } from "@/components/icons";
import { SearchArea } from "@/components/search-area";
import { Pagination } from "@heroui/pagination";
import { useEffect, useState } from "react";
import {
  getAllPublicArticleCategory,
  getPublicArticlesByCategory,
} from "@/data/article";
import { TCategory } from "@/types/article";
import { useCategory } from "./use-category";

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

export default function Home() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const {
    activeCategory,
    setActiveCategory,
    articles,
    setArticles,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  } = useCategory();

  useEffect(() => {
    fetchArticleCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchArticlesByCategory(activeCategory);
    }
  }, [currentPage]);

  const fetchArticleCategories = async () => {
    try {
      const { data } = await getAllPublicArticleCategory(USER_NAME);
      const formattedCategories = data.map((category) => ({
        id: category.id,
        name: category.category_name,
        icon: <FolderIcon />,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching article categories:", error);
    }
  };

  const arrangeDateFormat = (date: Date) => {
    const [year, month, day] = date.toLocaleDateString().split("/");
    return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
  };

  const fetchArticlesByCategory = async (categoryId: number) => {
    setLoading(true);
    try {
      const { data } = await getPublicArticlesByCategory(
        categoryId,
        USER_NAME,
        currentPage
      );
      const formattedArticles = data.articles.map((article) => ({
        id: article.id,
        categoryId: article.category_id,
        title: article.title,
        content: article.content,
        excerpt: article.content.slice(0, 100) + "...",
        lastUpdated: arrangeDateFormat(new Date(article.updated_at)),
      }));
      setArticles(formattedArticles);
      setActiveCategory(categoryId);
      setTotalPages(data.total_page);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <MainBanner
        title="ZeoXer's Blog"
        description="楊佳勳的個人部落格，主要分享一些技術筆記和學習紀錄"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
      />

      {/* Main Content Area */}
      <MainLayout
        leftSidebar={
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={(id) => {
              if (id !== activeCategory) {
                setCurrentPage(1);
              }
              fetchArticlesByCategory(id);
            }}
          />
        }
        rightSidebar={<SearchArea />}
        lgLayoutRatio="lg:grid-cols-[25%_1fr_25%]"
      >
        <MobileCategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={(id) => {
            if (id !== activeCategory) {
              setCurrentPage(1);
            }
            fetchArticlesByCategory(id);
          }}
        />
        {/* Blog Post List */}
        {!activeCategory ? (
          <p className="text-center text-default-500 p-6 hidden lg:block">
            請選擇分類以查看文章
          </p>
        ) : articles.length > 0 ? (
          <section className="flex flex-col gap-4">
            <Pagination
              initialPage={currentPage}
              total={totalPages}
              showControls
              color="warning"
              size="lg"
              className="cursor-pointer"
              onChange={setCurrentPage}
            />
            <BlogPostList posts={articles} loading={loading} />
          </section>
        ) : (
          <p className="text-center text-default-500 p-6">無此分類的文章</p>
        )}
      </MainLayout>
    </div>
  );
}
