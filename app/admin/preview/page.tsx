import { Suspense } from "react";
import { PreviewArticle } from "./preview-article";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const metadata = {
  title: "預覽文章",
};

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <Card className="w-full space-y-5 p-4 animate-appearance-in">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg">
              <div className="h-3 w-1/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200" />
          </Skeleton>
        </Card>
      }
    >
      <section className="py-8">
        <PreviewArticle />
      </section>
    </Suspense>
  );
}
