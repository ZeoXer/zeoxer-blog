import { getPublicArticle } from "@/data/article";

interface PageProps {
  params: Promise<{ id: string }>;
}

const fetchArticle = async (id: number) => {
  try {
    const { data } = await getPublicArticle(id, "ZeoXer");
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

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await fetchArticle(+id);

  return (
    <main>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Article",
            headline: article.title,
            url: "https://blog.zeoxer.com/article/" + id,
            dateModified: article.lastUpdated,
            author: { "@type": "Person", name: "ZeoXer" },
          }),
        }}
      />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const article = await fetchArticle(+id);

  return {
    title: article.title,
    description: `${article.excerpt}`,
    icons: {
      icon: "/zeoxers-blog-logo-transparent.svg",
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: "https://blog.zeoxer.com/article/" + id,
      siteName: "ZeoXer's Blog",
    },
  };
}
