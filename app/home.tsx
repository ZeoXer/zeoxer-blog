"use client";

import { MainBanner } from "@/components/main-banner";
import {
  CategorySidebar,
  MobileCategorySidebar,
} from "@/components/category-sidebar";
import { BlogPostList } from "@/components/blog-post-list";
import { MainLayout } from "@/components/main-layout";
import { SearchArea } from "@/components/search-area";
import { Pagination } from "@heroui/pagination";
import { cache, useEffect } from "react";
import { arrangeDateFormat, getPublicArticlesByCategory } from "@/data/article";
import { TCategory } from "@/types/article";
import { useCategory } from "./use-category";
import { Readme } from "./readme";
import { siteConfig } from "@/config/site";

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

export default function Home({ categories }: { categories: TCategory[] }) {
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
    if (activeCategory) {
      fetchArticlesByCategory(activeCategory);
    }
  }, [currentPage]);

  const fetchArticlesByCategory = cache(async (categoryId: number) => {
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
        createDate: arrangeDateFormat(new Date(article.create_at)),
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
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <MainBanner
        title={siteConfig.name}
        description={siteConfig.description}
        // backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
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
            if (id === 0) {
              setActiveCategory(0);
              return;
            }
            if (id !== activeCategory) {
              setCurrentPage(1);
            }
            fetchArticlesByCategory(id);
          }}
        />
        {/* Blog Post List */}
        {!activeCategory ? (
          <Readme />
        ) : articles.length > 0 ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold mb-2">
              {categories.find((cat) => cat.id === activeCategory)?.name}
            </h2>
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
