"use client";

import { MainLayout } from "@/components/main-layout";
import MarkdownDisplay from "@/components/markdown-display";
import { getArticle } from "@/data/article";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const PreviewArticle = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      fetchArticlePreview(id);
    }
  }, [id]);

  const fetchArticlePreview = async (articleId: string) => {
    try {
      const { data } = await getArticle(+articleId);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error("Failed to fetch article preview:", error);
      return null;
    }
  };

  return (
    <MainLayout
      leftSidebar={
        <Card className="p-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">功能選單</h2>
          </CardHeader>
          <Divider />
          <CardBody className="grid grid-cols-1 gap-3">
            <Button color="primary" as={Link} href={`/admin/article/${id}`}>
              前往編輯
            </Button>
            <Button color="secondary" as={Link} href="/admin/article">
              回文章列表
            </Button>
          </CardBody>
        </Card>
      }
      lgLayoutRatio="lg:grid-cols-[20%_1fr]"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-warning">
        {title}
      </h1>
      <MarkdownDisplay content={content} />
    </MainLayout>
  );
};
