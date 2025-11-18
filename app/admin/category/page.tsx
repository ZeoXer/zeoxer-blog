"use client";

import { AdminBlogCategoryList } from "@/components/admin-blog-category-list";
import {
  addArticleCategory,
  deleteArticleCategory,
  getAllArticleCategory,
  getArticlesByCategory,
} from "@/data/article";
import { TCategory } from "@/types/article";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    fetchArticleCategories();
  }, []);

  const addNewCategory = async (categoryName: string) => {
    if (categoryName.trim() === "") {
      addToast({
        title: "分類名稱不可為空",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "warning",
      });
      return;
    }

    try {
      const { status } = await addArticleCategory(categoryName);
      if (status === 1) {
        await fetch("/api/revalidate-home", {
          method: "POST",
        });
        fetchArticleCategories();
        addToast({
          title: "分類新增成功",
          description: categoryName,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
      }
    } catch (error) {
      addToast({
        title: "分類新增失敗",
        description: String(error),
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    }
  };

  const removeArticleCategory = async (categoryId: number) => {
    const {
      data: { articles },
    } = await getArticlesByCategory(categoryId, 1);
    if (articles.length !== 0) {
      addToast({
        title: "無法刪除分類",
        description: "該分類下尚有文章故無法刪除",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    } else {
      try {
        const { status } = await deleteArticleCategory(categoryId);
        if (status === 1) {
          await fetch("/api/revalidate-home", {
            method: "POST",
          });
          setCategories(
            categories.filter((category) => category.id !== categoryId)
          );
          addToast({
            title: "分類刪除成功",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            color: "success",
          });
        }
      } catch (error) {
        addToast({
          title: "分類刪除失敗",
          description: String(error),
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "danger",
        });
      }
    }
  };

  const fetchArticleCategories = async () => {
    try {
      const { data } = await getAllArticleCategory();
      const formattedCategories = data.map((category) => ({
        id: category.id,
        name: category.category_name,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching article categories:", error);
    }
  };

  return (
    <section className="px-4 py-8 sm:p-0">
      <h2 className="mb-8 font-bold text-3xl">所有分類</h2>
      <AdminBlogCategoryList
        categories={categories}
        addNewCategory={addNewCategory}
        removeArticleCategory={removeArticleCategory}
      />
    </section>
  );
}
