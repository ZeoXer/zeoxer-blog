import { APIResponse } from "@/types/auth";
import { HttpClient } from "./client/http-client";
import { API_ENDPOINTS } from "./client/endpoints";
import { Article, ArticleAnalysis, ArticleCategory } from "@/types/article";
import { revalidatePath } from "next/cache";

export async function addArticleCategory(categoryName: string) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.ADD_CATEGORY,
    {
      category_name: categoryName,
    }
  );
  revalidatePath("/", "page");

  return response;
}

export async function getAllArticleCategory() {
  const response = await HttpClient.get<APIResponse<ArticleCategory[]>>(
    API_ENDPOINTS.GET_ALL_CATEGORY
  );

  return response;
}

export async function getAllPublicArticleCategory(authorName: string) {
  const response = await HttpClient.get<APIResponse<ArticleCategory[]>>(
    `${API_ENDPOINTS.GET_ALL_PUBLIC_CATEGORY}/${authorName}`
  );

  return response;
}

export async function getArticleCategoryById(
  authorName: string,
  categoryId: number
) {
  const response = await HttpClient.get<APIResponse<ArticleCategory>>(
    `${API_ENDPOINTS.GET_CATEGORY_BY_ID}/${authorName}/${categoryId}`
  );

  return response;
}

export async function updateArticleCategory(
  categoryId: number,
  categoryName: string
) {
  const response = await HttpClient.put<APIResponse<unknown>>(
    `${API_ENDPOINTS.UPDATE_CATEGORY}/${categoryId}`,
    {
      category_name: categoryName,
    }
  );
  revalidatePath("/", "page");

  return response;
}

export async function deleteArticleCategory(categoryId: number) {
  const response = await HttpClient.delete<APIResponse<unknown>>(
    `${API_ENDPOINTS.DELETE_CATEGORY}/${categoryId}`
  );
  revalidatePath("/", "page");

  return response;
}

export async function addArticle(
  title: string,
  content: string,
  categoryId: number
) {
  const response = await HttpClient.post<APIResponse<unknown>>(
    API_ENDPOINTS.ADD_ARTICLE,
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
    `${API_ENDPOINTS.GET_ARTICLE}/${articleId}`
  );

  return response;
}

export async function getPublicArticle(articleId: number, authorName: string) {
  const response = await HttpClient.get<APIResponse<Article>>(
    `${API_ENDPOINTS.GET_PUBLIC_ARTICLE}/${authorName}/${articleId}`
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
    `${API_ENDPOINTS.UPDATE_ARTICLE}/${articleId}`,
    {
      title,
      content,
      is_published: isPublished,
      category_id: categoryId,
    }
  );
  revalidatePath(`/article/${articleId}`);

  return response;
}

export async function deleteArticle(articleId: number) {
  const response = await HttpClient.delete<APIResponse<unknown>>(
    `${API_ENDPOINTS.DELETE_ARTICLE}/${articleId}`
  );

  return response;
}

export async function getArticlesByCategory(
  categoryId: number,
  page: number = 1
) {
  const response = await HttpClient.get<
    APIResponse<{ articles: Article[]; total_page: number }>
  >(`${API_ENDPOINTS.GET_ARTICLES_BY_CATEGORY}/${categoryId}?page=${page}`);

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
    `${API_ENDPOINTS.GET_PUBLIC_ARTICLES_BY_CATEGORY}/${authorName}/${categoryId}?page=${page}`
  );

  return response;
}

export async function getArticleAnalysis(authorName: string) {
  const response = await HttpClient.get<APIResponse<ArticleAnalysis>>(
    `${API_ENDPOINTS.GET_ARTICLE_ANALYSIS}/${authorName}`
  );

  return response;
}

export async function searchArticleByKeyword(keyword: string) {
  const response = await HttpClient.get<APIResponse<Article[]>>(
    `${API_ENDPOINTS.SEARCH_ARTICLE}?keyword=${keyword}`
  );

  return response;
}

export async function searchArticlePublicByKeyword(
  keyword: string,
  authorName: string
) {
  const response = await HttpClient.get<APIResponse<Article[]>>(
    `${API_ENDPOINTS.SEARCH_ARTICLE_PUBLIC}/${authorName}?keyword=${keyword}`
  );

  return response;
}
