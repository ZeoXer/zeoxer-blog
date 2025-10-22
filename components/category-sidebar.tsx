"use client";

import { ReactNode } from "react";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";

interface Category {
  id: string;
  name: string;
  icon: ReactNode;
}

interface CategorySidebarProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

export const CategorySidebar = ({
  categories,
  activeCategory,
  onCategoryClick,
}: CategorySidebarProps) => {
  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <h2 className="text-xl font-semibold mb-4">所有分類</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === category.id
                  ? "bg-default-100"
                  : "hover:bg-default-50"
              }`}
              onPress={() => onCategoryClick?.(category.id)}
            >
              <span className="text-default-500">{category.icon}</span>
              <span className="text-default-700 dark:text-default-300">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
