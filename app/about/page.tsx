"use client";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import {
  FolderIcon,
  DocumentIcon,
  EmailIcon,
  GithubIcon,
} from "@/components/icons";
import { Divider } from "@heroui/divider";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { getArticleAnalysis } from "@/data/article";
import NumberCounter from "@/components/number-counter";
import { Link } from "@heroui/link";
import TimelineItem from "@/components/timeline-item";

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
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex items-center gap-4">
            <Avatar
              src="https://pub-730d41d50aa14413843d2f22e88310a6.r2.dev/uploads/2025/10/03/%E6%97%A5%E5%B8%B8%E5%80%8B%E4%BA%BA.jpg"
              className="w-24 h-24 lg:w-50 lg:h-50"
              isBordered
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground">楊佳勳</h1>

              <Link
                href="mailto:andrew17413@gmail.com"
                className="flex gap-2 text-default-800 items-center hover:text-warning transition-colors"
              >
                <EmailIcon className="w-7 h-7" />
                <span>andrew17413@gmail.com</span>
              </Link>
              <div className="flex gap-2">
                <Link href="https://github.com/ZeoXer" isExternal>
                  <GithubIcon className="w-7 h-7 text-default-800 hover:text-warning transition-colors" />
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457]">
              <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
                <DocumentIcon className="w-10 h-10 text-black" />
                <p className="text-black">文章總數</p>
                <p className="text-4xl font-bold text-black">
                  <NumberCounter endNumber={analysis[0]} />
                </p>
              </CardBody>
            </Card>
            <Card className="bg-gradient-to-br from-[#FFD166] to-[#FFB457]">
              <CardBody className="flex flex-col items-center justify-center p-4 gap-3">
                <FolderIcon className="w-10 h-10 text-black stroke-2" />
                <p className="text-black">主題總數</p>
                <p className="text-4xl font-bold text-black">
                  <NumberCounter endNumber={analysis[1]} />
                </p>
              </CardBody>
            </Card>
          </div>
        </header>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-foreground">關於我</h2>
          <Card className="bg-[#F5EFE6] dark:bg-default-100">
            <CardBody className="p-6">
              <p className="text-default-700 dark:text-default-600 leading-relaxed">
                {siteConfig.about}
              </p>
            </CardBody>
          </Card>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground">工作經歷</h2>
            <Card className="bg-[#F5EFE6] dark:bg-default-100">
              <CardBody className="p-8">
                {siteConfig.workExperience.map((exp, i) => (
                  <div key={exp.company}>
                    <TimelineItem
                      title={exp.company}
                      subtitle={exp.role}
                      startDate={exp.startYear}
                      endDate={exp.endYear}
                      description={exp.description}
                      logoUrl={exp.logo}
                    />
                    {i < siteConfig.workExperience.length - 1 && (
                      <Divider className="my-6" />
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-col gap-4 animate-move-from-bottom">
            <h2 className="text-2xl font-bold text-foreground">學習經歷</h2>
            <Card className="bg-[#F5EFE6] dark:bg-default-100">
              <CardBody className="p-8">
                {siteConfig.education.map((exp, i) => (
                  <div key={exp.degree}>
                    <TimelineItem
                      title={exp.school}
                      subtitle={exp.degree}
                      startDate={exp.startYear}
                      endDate={exp.endYear}
                      logoUrl={exp.logo}
                    />
                    {i < siteConfig.education.length - 1 && (
                      <Divider className="my-6" />
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
}
