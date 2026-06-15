// app/sitemap.ts
import { Article } from "@/types/article";
import { MetadataRoute } from "next";

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

async function getAllArticles(): Promise<Article[]> {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!baseApi || !USER_NAME) {
    return [];
  }

  try {
    const res = await fetch(`${baseApi}/public/${USER_NAME}/article`);
    const rawText = await res.text();
    return JSON.parse(rawText).data ?? [];
  } catch (error) {
    console.error("Sitemap 資料抓取失敗:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blog.zeoxer.com";

  const articles = await getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...articleUrls];
}
