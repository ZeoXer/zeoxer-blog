"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { SearchBar } from "./search-bar";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Link } from "@heroui/link";
import { useCallback, useEffect, useState } from "react";
import { searchArticlePublicByKeyword } from "@/data/article";
import { TArticle } from "@/types/article";

export const SearchArea = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<TArticle[]>([]);

  const hightlightTitle = (title: string) => {
    const re = new RegExp(keyword, "gi");
    if (title.match(re)) {
      const startIndex = title.indexOf(title.match(re)![0]);
      const endIndex = startIndex + keyword.length;
      return (
        <>
          {title.slice(0, startIndex)}
          <span className={"text-warning font-semibold"}>
            {title.match(re)![0]}
          </span>
          {title.slice(endIndex)}
        </>
      );
    }
    return title;
  };

  const hightlightContent = (content: string) => {
    const re = new RegExp(keyword, "gi");
    const matches = content.match(re);
    if (!matches || matches?.length === 0) return "";

    const matchPart: JSX.Element[] = [];
    let position = 0;
    for (let i = 0; i < matches.length; i++) {
      // 從完整內文裡從上次結束的位置找到匹配項的位置
      const matchIndex = content.indexOf(matches[i], position);
      // 擷取前後 10 個字元的位置
      const start = Math.max(0, matchIndex - 15);
      const end = Math.min(content.length, matchIndex + keyword.length + 15);
      const prefix = start > 0 ? "..." : "";
      const suffix = end < content.length ? "..." : "";

      matchPart.push(
        <li className="my-1 opacity-60" key={i}>
          {prefix}
          {content.slice(start, matchIndex)}
          <span className="text-warning font-semibold">{matches[i]}</span>
          {content.slice(matchIndex + keyword.length, end)}
          {suffix}
        </li>
      );

      // 更新下次搜尋的起始位置
      position = matchIndex + keyword.length;
    }

    return matchPart.length >= 3 ? matchPart.slice(0, 3) : matchPart;
  };

  const searchArticle = useCallback(async () => {
    setSearchResults([]);

    if (!keyword) return;

    try {
      const { data } = await searchArticlePublicByKeyword(keyword, "ZeoXer");
      const formattedResults = data.map((article) => ({
        id: article.id,
        categoryId: article.category_id,
        title: article.title,
        content: article.content,
        excerpt: article.content.slice(0, 100) + "...",
        lastUpdated: new Date(article.updated_at).toLocaleDateString(),
      }));
      setSearchResults(formattedResults);
    } catch (error) {
      console.error("Error searching articles:", error);
    }
  }, [keyword]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchArticle();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchArticle]);

  return (
    <div className="space-y-5">
      <SearchBar
        placeholder="關鍵字搜尋..."
        className="w-full"
        onSearch={setKeyword}
      />
      <ScrollShadow className="max-h-[600px]" size={50}>
        <div className="border-t border-default-200 pt-5 space-y-5 overflow-auto">
          {searchResults.length > 0 ? (
            searchResults.map((article) => (
              <div key={article.id}>
                <Card className="w-full">
                  <CardHeader className="flex-col items-start px-6 pt-6 pb-0">
                    <h3 className="text-xl font-semibold text-warning line-clamp-1">
                      {hightlightTitle(article.title)}
                    </h3>
                  </CardHeader>
                  <CardBody className="px-6 py-2">
                    <p className="text-default-600 dark:text-default-500 line-clamp-3">
                      {hightlightContent(article.content)}
                    </p>
                  </CardBody>
                  <CardFooter className="px-6 pb-6 flex justify-end items-center">
                    <Button
                      as={Link}
                      href={`/article/${article.id}`}
                      variant="bordered"
                      size="md"
                    >
                      閱讀文章
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-default-500 text-center">無搜尋結果</p>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
};
