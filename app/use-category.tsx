"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";
import { TArticle } from "@/types/article";

type CategoryContextValue = {
  activeCategory: number | undefined;
  setActiveCategory: (cat: number | undefined) => void;
  articles: TArticle[];
  setArticles: (articles: TArticle[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
};

const CategoryContext = createContext<CategoryContextValue | undefined>(
  undefined
);

type ProviderProps = PropsWithChildren<{
  initialCategory?: number | undefined;
  initialArticles?: TArticle[];
}>;

export function CategoryProvider({
  children,
  initialCategory = undefined,
  initialArticles = [],
}: ProviderProps) {
  const [activeCategory, setActiveCategory] = useState<number | undefined>(
    initialCategory
  );
  const [articles, setArticles] = useState<TArticle[]>(initialArticles);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const value = useMemo<CategoryContextValue>(
    () => ({
      activeCategory,
      setActiveCategory,
      articles,
      setArticles,
      loading,
      setLoading,
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
    }),
    [
      activeCategory,
      articles,
      loading,
      currentPage,
      totalPages,
      setActiveCategory,
      setArticles,
      setLoading,
      setCurrentPage,
      setTotalPages,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory(): CategoryContextValue {
  const ctx = useContext(CategoryContext);
  if (!ctx)
    throw new Error("useCategory must be used within a CategoryProvider");
  return ctx;
}
