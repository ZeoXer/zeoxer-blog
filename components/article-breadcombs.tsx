import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { DocumentIcon, FolderIcon, HomeIcon } from "@/components/icons";

interface BreadcrumbsProps {
  categoryName: string;
  title: string;
}

export const ArticleBreadcrumbs = ({
  categoryName,
  title,
}: BreadcrumbsProps) => {
  return (
    <Breadcrumbs underline="hover" className="hidden md:block">
      <BreadcrumbItem startContent={<HomeIcon className="w-5" />} href="/">
        首頁
      </BreadcrumbItem>
      <BreadcrumbItem startContent={<FolderIcon className="w-5" />}>
        {categoryName}
      </BreadcrumbItem>
      <BreadcrumbItem startContent={<DocumentIcon className="w-5" />}>
        {title}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};
