import { CategoryProvider } from "../use-category";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CategoryProvider>{children}</CategoryProvider>;
}
