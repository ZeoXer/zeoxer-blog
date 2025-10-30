"use client";

import { TCategory } from "@/types/article";
import { AdminBlogCategoryCard } from "./admin-blog-category-card";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { PlusIcon, XIcon } from "./icons";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import clsx from "clsx";

interface AdminBlogCategoryListProps {
  categories: TCategory[];
  addNewCategory: (categoryName: string) => Promise<void>;
  removeArticleCategory: (categoryId: number) => Promise<void>;
}

export const AdminBlogCategoryList = ({
  categories,
  addNewCategory,
  removeArticleCategory,
}: AdminBlogCategoryListProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <AdminBlogCategoryCard
          key={category.id}
          category={category}
          removeArticleCategory={removeArticleCategory}
        />
      ))}
      <Card
        className={clsx(
          "p-2 border-default-600 transition-all",
          !isCreating && "border-dashed border-2"
        )}
        isPressable={!isCreating}
        onPress={() => setIsCreating(true)}
      >
        {isCreating ? (
          <>
            <CardHeader>
              <Input
                value={newCategoryName}
                onValueChange={setNewCategoryName}
                variant="bordered"
                placeholder="輸入分類名稱"
                className="animate-appearance-in"
                classNames={{ input: "text-lg" }}
              />
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                isIconOnly
                className="animate-appearance-in"
                color="success"
                onPress={async () => {
                  await addNewCategory(newCategoryName);
                  setNewCategoryName("");
                  setIsCreating(false);
                }}
              >
                <PlusIcon className="w-5 h-5 text-white" />
              </Button>
              <Button
                isIconOnly
                className="animate-appearance-in"
                color="danger"
                onPress={() => {
                  setNewCategoryName("");
                  setIsCreating(false);
                }}
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </CardFooter>
          </>
        ) : (
          <PlusIcon className="w-12 h-12 m-auto text-default-500" />
        )}
      </Card>
    </section>
  );
};
