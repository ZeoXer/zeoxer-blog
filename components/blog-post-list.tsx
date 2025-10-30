"use client";

import { Skeleton } from "@heroui/skeleton";
import { BlogPostCard } from "./blog-post-card";
import { Card } from "@heroui/card";
import { TArticle } from "@/types/article";
import { AdminBlogPostCard } from "./admin-blog-post-card";

interface BlogPostListProps {
  posts: TArticle[];
  loading?: boolean;
  isAdmin?: boolean;
}

export const BlogPostList = ({
  posts,
  loading = false,
  isAdmin = false,
}: BlogPostListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card className="w-full space-y-5 p-4 animate-appearance-in" key={i}>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
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
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) =>
        isAdmin ? (
          <AdminBlogPostCard key={post.id} post={post} />
        ) : (
          <BlogPostCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            lastUpdated={post.lastUpdated}
          />
        )
      )}
    </div>
  );
};
