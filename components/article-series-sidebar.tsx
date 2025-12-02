"use client";

import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Tooltip } from "@heroui/tooltip";
import { TagIcon } from "./icons";
import { Divider } from "@heroui/divider";
import { useCategory } from "@/app/use-category";

interface ArticleSeriesSidebarProps {
  categoryName: string;
  currentArticleId: number;
}

export const ArticleSeriesSidebar = ({
  categoryName,
  currentArticleId,
}: ArticleSeriesSidebarProps) => {
  const { articles } = useCategory();

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
