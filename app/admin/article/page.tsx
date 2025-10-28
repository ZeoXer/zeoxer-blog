"use client";

import { useCategory } from "@/app/use-category";
import { BlogPostList } from "@/components/blog-post-list";
import {
  CategorySidebar,
  MobileCategorySidebar,
} from "@/components/category-sidebar";
import { FolderIcon } from "@/components/icons";
import { MainLayout } from "@/components/main-layout";
import { getAllArticleCategory, getArticlesByCategory } from "@/data/article";
import { TCategory } from "@/types/article";
import { useEffect, useState } from "react";

export default function AdminArticlePage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const {
    articles,
    activeCategory,
    setArticles,
    setActiveCategory,
    setLoading,
    loading,
  } = useCategory();

  useEffect(() => {
    fetchArticleCategories();
  }, []);

  const fetchArticleCategories = async () => {
    try {
      const { data } = await getAllArticleCategory();
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
      const { data } = await getArticlesByCategory(categoryId);
      const formattedArticles = data.map((article) => ({
        id: article.id,
        categoryId: article.category_id,
        title: article.title,
        content: article.content,
        excerpt: article.content.slice(0, 100) + "...",
        isPublished: article.is_published,
        lastUpdated: arrangeDateFormat(new Date(article.updated_at)),
      }));
      setArticles(formattedArticles);
      setActiveCategory(categoryId);
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
          onCategoryClick={(id) => fetchArticlesByCategory(id)}
        />
      }
      lgLayoutRatio="lg:grid-cols-[25%_1fr]"
    >
      <MobileCategorySidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={(id) => fetchArticlesByCategory(id)}
      />
      {/* Blog Post List */}
      {articles.length > 0 ? (
        <BlogPostList posts={articles} loading={loading} isAdmin />
      ) : (
        <p className="text-center text-default-500 p-6">無此分類的文章</p>
      )}
    </MainLayout>
  );
}
