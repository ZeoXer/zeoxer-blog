import { FolderIcon } from "@/components/icons";
import AdminHome from "./home";
import axios from "axios";
import { API_ENDPOINTS } from "@/data/client/endpoints";
import { getAuthTokenServer } from "@/data/server/token";
import { ArticleCategory } from "@/types/article";
import { redirect } from "next/navigation";
import { clearAuthToken } from "@/data/client/token";

const fetchArticleCategories = async () => {
  const token = await getAuthTokenServer();

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${API_ENDPOINTS.GET_ALL_CATEGORY}`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    );

    const formattedCategories = (data.data as ArticleCategory[]).map(
      (category) => ({
        id: category.id,
        name: category.category_name,
        icon: <FolderIcon />,
      })
    );
    return formattedCategories;
  } catch (error) {
    console.error("Error fetching article categories:", error);
    clearAuthToken();
    redirect("/admin/login");
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
