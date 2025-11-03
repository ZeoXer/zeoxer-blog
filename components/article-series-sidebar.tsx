"use client";

import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Tooltip } from "@heroui/tooltip";
import { TagIcon } from "./icons";
import { useEffect, useState } from "react";
import {
  getArticleCategoryById,
  getPublicArticlesByCategory,
} from "@/data/article";
import { TArticle } from "@/types/article";
import { Divider } from "@heroui/divider";

interface ArticleSeriesSidebarProps {
  categoryId: number | undefined;
  currentArticleId?: number;
}
const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "ZeoXer";

export const ArticleSeriesSidebar = ({
  categoryId,
  currentArticleId,
}: ArticleSeriesSidebarProps) => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryId) {
      fetchArticlesByCategory(categoryId);
      fetchCurrentCategory(categoryId);
    }
  }, [categoryId]);

  const fetchArticlesByCategory = async (categoryId: number) => {
    try {
      const { data } = await getPublicArticlesByCategory(categoryId, USER_NAME);
      const formattedArticles = data.articles.map((article) => ({
        id: article.id,
        categoryId: article.category_id,
        title: article.title,
        content: article.content,
        excerpt: article.content.slice(0, 100) + "...",
        lastUpdated: new Date(article.updated_at).toLocaleDateString(),
      }));
      setArticles(formattedArticles);
    } catch (error) {
      console.error("Error fetching articles by category:", error);
    }
  };

  const fetchCurrentCategory = async (categoryId: number) => {
    try {
      const { data } = await getArticleCategoryById(USER_NAME, categoryId);
      setCategoryName(data.category_name);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-foreground">
          {categoryName}
        </h2>
        <span className="text-sm text-default-700">系列文章</span>
        <Divider className="my-2" />
        <div className="flex flex-col gap-2">
          {articles.map((article) => (
            <Tooltip
              key={article.id}
              color="default"
              placement="bottom"
              offset={-7}
              content={article.title}
            >
              <Link
                key={article.id}
                as={NextLink}
                href={`/article/${article.id}`}
                className={`flex px-3 py-2 gap-3 rounded-lg transition-colors ${
                  currentArticleId === article.id
                    ? "bg-default-100 text-foreground font-medium"
                    : "text-default-700 hover:bg-default-50"
                }`}
              >
                <span className="text-default-500">
                  <TagIcon />
                </span>
                <span className="text-default-700 line-clamp-1">
                  {article.title}
                </span>
              </Link>
            </Tooltip>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
