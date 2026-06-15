export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",

  // Article Category (private)
  CATEGORY: "/category",

  // Article (private)
  ARTICLE: "/article",
  ARTICLE_BY_CATEGORY: "/article/category", // append `/${categoryId}`
  ARTICLE_SEARCH: "/article/search",

  // Public — prefix; usage: `${PUBLIC}/${authorName}/...`
  PUBLIC: "/public",

  // Storage (R2)
  STORAGE: "/storage",
};
