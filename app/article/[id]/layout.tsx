import { getPublicArticle } from "@/data/article";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const fetchArticle = async () => {
    try {
      const { data } = await getPublicArticle(+id, "ZeoXer");
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.content.slice(0, 100) + "...",
        lastUpdated: new Date(data.updated_at).toLocaleDateString(),
      };
    } catch (error) {
      console.error("Error fetching article for metadata:", error);
      return {
        id: 0,
        title: "Article Not Found",
        content: "",
        excerpt: "The requested article could not be found.",
        lastUpdated: "",
      };
    }
  };

  const article = await fetchArticle();

  return {
    title: article.title,
    description: `${article.excerpt}`,
    icons: {
      icon: "/zeoxers-blog-logo-transparent.svg",
    },
  };
}
