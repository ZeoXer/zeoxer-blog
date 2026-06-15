import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";
import { Article, ArticleAnalysis, ArticleCategory } from "@/types/article";

// --- Article Category (private) ---

export async function addArticleCategory(categoryName: string) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.CATEGORY,
    {
      category_name: categoryName,
    }
  );

  return response;
}

export async function getAllArticleCategory() {
  const response = await HttpClient.get<APIResponse<ArticleCategory[]>>(
    API_ENDPOINTS.CATEGORY
  );

  return response;
}

export async function updateArticleCategory(
  categoryId: number,
  categoryName: string
) {
  const response = await HttpClient.put<APIResponse<unknown>>(
    `${API_ENDPOINTS.CATEGORY}/${categoryId}`,
    {
      category_name: categoryName,
    }
  );

  return response;
}

export async function deleteArticleCategory(categoryId: number) {
  const response = await HttpClient.delete<APIResponse<unknown>>(
    `${API_ENDPOINTS.CATEGORY}/${categoryId}`
  );

  return response;
}

// --- Article Category (public) ---

export async function getAllPublicArticleCategory(authorName: string) {
  const response = await HttpClient.get<APIResponse<ArticleCategory[]>>(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/category`
  );

  return response;
}

export async function getArticleCategoryById(
  authorName: string,
  categoryId: number
) {
  const response = await HttpClient.get<APIResponse<ArticleCategory>>(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/category/${categoryId}`
  );

  return response;
}

// --- Article (private) ---

export async function addArticle(
  title: string,
  content: string,
  categoryId: number
) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.ARTICLE,
    {
      title,
      content,
      category_id: categoryId,
    }
  );

  return response;
}

export async function getArticle(articleId: number) {
  const response = await HttpClient.get<APIResponse<Article>>(
    `${API_ENDPOINTS.ARTICLE}/${articleId}`
  );

  return response;
}

export async function updateArticle(
  articleId: number,
  title: string,
  content: string,
  isPublished: boolean,
  categoryId: number
) {
  const response = await HttpClient.put<APIResponse<unknown>>(
    `${API_ENDPOINTS.ARTICLE}/${articleId}`,
    {
      title,
      content,
      is_published: isPublished,
      category_id: categoryId,
    }
  );

  return response;
}

export async function deleteArticle(articleId: number) {
  const response = await HttpClient.delete<APIResponse<unknown>>(
    `${API_ENDPOINTS.ARTICLE}/${articleId}`
  );

  return response;
}

export async function getArticlesByCategory(
  categoryId: number,
  page: number = 1
) {
  const response = await HttpClient.get<
    APIResponse<{ articles: Article[]; total_page: number }>
  >(`${API_ENDPOINTS.ARTICLE_BY_CATEGORY}/${categoryId}?pageNumber=${page}`);

  return response;
}

export async function searchArticleByKeyword(keyword: string) {
  const response = await HttpClient.get<APIResponse<Article[]>>(
    `${API_ENDPOINTS.ARTICLE_SEARCH}?keyword=${encodeURIComponent(keyword)}`
  );

  return response;
}

// --- Article (public) ---

export async function getPublicArticle(articleId: number, authorName: string) {
  const response = await HttpClient.get<APIResponse<Article>>(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/article/${articleId}`
  );

  return response;
}

export async function getPublicArticlesByCategory(
  categoryId: number,
  authorName: string,
  page: number = 1
) {
  const response = await HttpClient.get<
    APIResponse<{ articles: Article[]; total_page: number }>
  >(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/category/${categoryId}/article?pageNumber=${page}`
  );

  return response;
}

export async function searchArticlePublicByKeyword(
  keyword: string,
  authorName: string
) {
  const response = await HttpClient.get<APIResponse<Article[]>>(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/article/search?keyword=${encodeURIComponent(keyword)}`
  );

  return response;
}

export async function getArticleAnalysis(authorName: string) {
  const response = await HttpClient.get<APIResponse<ArticleAnalysis>>(
    `${API_ENDPOINTS.PUBLIC}/${authorName}/analysis`
  );

  return response;
}

export const arrangeDateFormat = (date: Date) => {
  const [year, month, day] = date.toLocaleDateString().split("/");
  return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
};
