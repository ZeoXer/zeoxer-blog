"use client";

import { useEffect, useState } from "react";
import { getArticleAnalysis } from "@/data/article";
import { Experience } from "./experience";
import { Description } from "./description";
import { Skills } from "./skills";
import { Hero } from "./hero";

export default function AboutPage() {
  const [analysis, setAnalysis] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    fetchArticleAnalysis();
  }, []);

  const fetchArticleAnalysis = async () => {
    try {
      const { data } = await getArticleAnalysis("ZeoXer");
      const { article_amount, article_category_amount } = data;
      setAnalysis([article_amount, article_category_amount]);
    } catch (error) {
      console.error("Error fetching article analysis:", error);
    }
  };

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <section className="flex flex-col gap-8">
        <Hero articleCount={analysis[0]} categoryCount={analysis[1]} />
        <Description />
        <Skills />
        <Experience />
      </section>
    </main>
  );
}
