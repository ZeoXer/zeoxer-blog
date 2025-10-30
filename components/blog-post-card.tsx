"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

interface BlogPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  lastUpdated: string;
  onReadClick?: () => void;
}

export const BlogPostCard = ({
  id,
  title,
  excerpt,
  lastUpdated,
  onReadClick,
}: BlogPostCardProps) => {
  return (
    <Card className="w-full animate-appearance-in">
      <CardHeader className="flex-col items-start px-6 pt-6 pb-0">
        <h3 className="text-xl font-semibold text-warning">{title}</h3>
      </CardHeader>
      <CardBody className="px-6 py-4">
        <p className="text-default-600 dark:text-default-500 line-clamp-3">
          {excerpt}
        </p>
      </CardBody>
      <CardFooter className="px-6 pb-6 flex justify-between items-center">
        <span className="text-sm text-default-500">最後更新 {lastUpdated}</span>
        <Button
          as={Link}
          href={`/article/${id}`}
          variant="bordered"
          size="md"
          onPress={onReadClick}
        >
          閱讀文章
        </Button>
      </CardFooter>
    </Card>
  );
};
