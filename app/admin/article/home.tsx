"use client";

import { useCategory } from "@/app/use-category";
import { BlogPostList } from "@/components/blog-post-list";
import {
  CategorySidebar,
  MobileCategorySidebar,
} from "@/components/category-sidebar";
import { PlusIcon } from "@/components/icons";
import { MainLayout } from "@/components/main-layout";
import { arrangeDateFormat, getArticlesByCategory } from "@/data/article";
import { TCategory } from "@/types/article";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { Link } from "@heroui/link";
import { useEffect } from "react";

export default function AdminHome({ categories }: { categories: TCategory[] }) {
  const {
    articles,
    activeCategory,
    loading,
    currentPage,
    totalPages,
    setArticles,
    setActiveCategory,
    setLoading,
    setCurrentPage,
    setTotalPages,
  } = useCategory();

  useEffect(() => {
    if (activeCategory) {
      fetchArticlesByCategory(activeCategory);
    }
  }, [currentPage]);

  const fetchArticlesByCategory = async (categoryId: number) => {
    setLoading(true);
    try {
      const { data } = await getArticlesByCategory(categoryId, currentPage);
      const formattedArticles = data.articles.map((article) => ({
        id: article.id,
        categoryId: article.category_id,
        title: article.title,
        content: article.content,
        excerpt: article.content.slice(0, 100) + "...",
        isPublished: article.is_published,
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
  };

  return (
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
      lgLayoutRatio="lg:grid-cols-[25%_1fr]"
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
      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <Pagination
            initialPage={currentPage}
            total={totalPages}
            showControls
            color="warning"
            size="lg"
            className="cursor-pointer"
            onChange={setCurrentPage}
          />
          <Button
            as={Link}
            href={`/admin/article/0?category=${activeCategory}`}
            size="lg"
            color="warning"
            variant="shadow"
            startContent={<PlusIcon className="w-6" />}
          >
            新文章
          </Button>
        </header>
        {activeCategory ? (
          articles.length > 0 ? (
            <BlogPostList posts={articles} loading={loading} isAdmin />
          ) : (
            <p className="text-center text-default-500 p-6">無此分類的文章</p>
          )
        ) : (
          <p className="text-center text-default-500 p-6">未選擇分類</p>
        )}
      </section>
    </MainLayout>
  );
}
