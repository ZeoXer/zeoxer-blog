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

  const value = useMemo<CategoryContextValue>(
    () => ({
      activeCategory,
      setActiveCategory,
      articles,
      setArticles,
      loading,
      setLoading,
    }),
    [
      activeCategory,
      articles,
      loading,
      setActiveCategory,
      setArticles,
      setLoading,
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
