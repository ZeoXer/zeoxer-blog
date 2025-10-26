"use client";

import { TArticle } from "@/types/article";
import { Card, CardBody } from "@heroui/card";
import { clsx } from "clsx";
import { useCallback, useEffect, useState } from "react";
import { marked } from "marked";

interface ArticleTocSidebarProps {
  article: TArticle | undefined;
}

type Tag = {
  id: number;
  tagName: string;
  tagContent: string;
};

const tagIndent = {
  H2: "pl-0",
  H3: "pl-6",
  H4: "pl-12",
  H5: "pl-18",
  H6: "pl-24",
};

export const ArticleTocSidebar = ({ article }: ArticleTocSidebarProps) => {
  const [tags, setTags] = useState([] as Tag[]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const parseContentToHTMLAndGetHTags = useCallback(async () => {
    if (!article?.content) return;
    const htmlContent = await marked(article.content);
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlContent, "text/html");

    const hTags = Array.from(
      htmlDoc.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );
    const tagsList: Tag[] = hTags.map((tag, idx) => {
      return {
        id: idx,
        tagName: tag.tagName,
        tagContent: tag.textContent,
      } as Tag;
    });
    setTags(tagsList);
  }, [article?.content]);

  useEffect(() => {
    parseContentToHTMLAndGetHTags();
  }, [parseContentToHTMLAndGetHTags]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardBody className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            文章段落
          </h2>
          <ul className="list-none">
            {tags.map((tag) => {
              return (
                <li
                  key={tag.id}
                  className={clsx(
                    "text-default-700 py-2",
                    tagIndent[tag.tagName as keyof typeof tagIndent]
                  )}
                >
                  <a
                    href={`#${tag.tagContent}`}
                    className="md:hover:underline md:hover:translate-x-2 inline-block duration-300 truncate"
                  >
                    {tag.tagContent}
                  </a>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};
