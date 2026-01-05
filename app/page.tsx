import { FolderIcon } from "@/components/icons";
import Home from "./home";
import { getAllPublicArticleCategory } from "@/data/article";
import { TCategory } from "@/types/article";

export const revalidate = 0;

const USER_NAME = process.env.NEXT_PUBLIC_USER_NAME || "";

const fetchArticleCategories = async (): Promise<TCategory[]> => {
  try {
    const { data } = await getAllPublicArticleCategory(USER_NAME);
    const formattedCategories = data.map((category) => ({
      id: category.id,
      name: category.category_name,
      icon: <FolderIcon className="w-5" />,
    }));
    return formattedCategories;
  } catch (error) {
    console.error("Error fetching article categories:", error);
    return [];
  }
};

export default async function HomePage() {
  const categories = await fetchArticleCategories();

  return (
    <main>
      <Home categories={categories} />
    </main>
  );
}
