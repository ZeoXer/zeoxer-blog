// app/sitemap.ts
import { Article } from "@/types/article";
import { MetadataRoute } from "next";

// 假設這是一個取得所有文章資料的函數 (你要替換成你實際的 API 或資料庫邏輯)
async function getAllArticles() {
  const apiUrl =
    "https://zeoxer.com/article/public/getAllPublicArticles/ZeoXer";

  try {
    const res = await fetch(apiUrl);
    const rawText = await res.text();

    console.log("============ SITEMAP DEBUG START ============");
    console.log("API URL:", apiUrl);
    console.log("API Status:", res.status);
    console.log("Raw Response:", rawText); // 兇手通常會在這裡現形
    console.log("============ SITEMAP DEBUG END ============");

    return JSON.parse(rawText).data;
  } catch (error) {
    console.error("Sitemap 資料抓取失敗:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blog.zeoxer.com";

  // 1. 抓取動態文章資料
  const articles = await getAllArticles();

  // 2. 將文章資料轉換成 Sitemap 格式
  const articleUrls = articles.map((article: Article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "weekly" as const, // 告訴 Google 更新頻率 (選填)
    priority: 0.7, // 權重 (選填，首頁通常是 1.0)
  }));

  // 3. 定義靜態頁面 (如首頁、關於我們)
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

  // 4. 合併並回傳
  return [...staticRoutes, ...articleUrls];
}
