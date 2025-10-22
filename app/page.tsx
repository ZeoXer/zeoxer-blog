"use client";

import { MainBanner } from "@/components/main-banner";
import { CategorySidebar } from "@/components/category-sidebar";
import { BlogPostList } from "@/components/blog-post-list";
import { PageFooter } from "@/components/page-footer";
import { MainLayout } from "@/components/main-layout";
import { FolderIcon } from "@/components/icons";

// Mock data for demonstration
const categories = [
  { id: "a", name: "Category A", icon: <FolderIcon /> },
  { id: "b", name: "Category B", icon: <FolderIcon /> },
  { id: "c", name: "Category C", icon: <FolderIcon /> },
  { id: "d", name: "Category D", icon: <FolderIcon /> },
  { id: "e", name: "Category E", icon: <FolderIcon /> },
  { id: "f", name: "Category F", icon: <FolderIcon /> },
];

const mockPosts = [
  {
    id: "1",
    title: "文章標題",
    excerpt:
      "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文...",
    content: "Full content here",
    lastUpdated: "2025/10/21",
    category: "a",
    slug: "post-1",
  },
  {
    id: "2",
    title: "文章標題",
    excerpt:
      "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文...",
    content: "Full content here",
    lastUpdated: "2025/10/21",
    category: "b",
    slug: "post-2",
  },
  {
    id: "3",
    title: "文章標題",
    excerpt:
      "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文...",
    content: "Full content here",
    lastUpdated: "2025/10/21",
    category: "c",
    slug: "post-3",
  },
  {
    id: "4",
    title: "文章標題",
    excerpt:
      "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文...",
    content: "Full content here",
    lastUpdated: "2025/10/21",
    category: "c",
    slug: "post-3",
  },
  {
    id: "5",
    title: "文章標題",
    excerpt:
      "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文...",
    content: "Full content here",
    lastUpdated: "2025/10/21",
    category: "c",
    slug: "post-3",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <MainBanner
        title="ZeoXer's Blog"
        description="楊佳勳的個人部落格，主要分享一些技術筆記和學習紀錄"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
      />

      {/* Main Content Area */}
      <MainLayout
        sidebar={
          <CategorySidebar
            categories={categories}
            onCategoryClick={(id) => console.log("Category clicked:", id)}
          />
        }
      >
        {/* Blog Post List */}
        <BlogPostList posts={mockPosts} />
      </MainLayout>

      {/* Footer */}
      <PageFooter
        year={new Date().getFullYear()}
        onAdminClick={() => console.log("Admin login clicked")}
      />
    </div>
  );
}
