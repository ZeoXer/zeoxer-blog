import { getAllArticleCategory } from "@/data/article";
import { FolderIcon } from "@/components/icons";
import AdminHome from "./home";

const fetchArticleCategories = async () => {
  try {
    const { data } = await getAllArticleCategory();
    const formattedCategories = data.map((category) => ({
      id: category.id,
      name: category.category_name,
      icon: <FolderIcon />,
    }));
    return formattedCategories;
  } catch (error) {
    console.error("Error fetching article categories:", error);
    return [];
  }
};

export default async function ArticleHomePage() {
  const categories = await fetchArticleCategories();

  return (
    <section>
      <AdminHome categories={categories} />
    </section>
  );
}
