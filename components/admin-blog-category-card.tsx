"use client";

import { useRef, useState } from "react";
import { TCategory } from "@/types/article";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { CheckIcon, EditIcon, TrashIcon, XIcon } from "./icons";
import { updateArticleCategory } from "@/data/article";
import { addToast } from "@heroui/toast";
import { revalidatePath } from "next/cache";

interface AdminBlogCategoryCardProps {
  category: TCategory;
  removeArticleCategory: (categoryId: number) => Promise<void>;
}

export const AdminBlogCategoryCard = ({
  category,
  removeArticleCategory,
}: AdminBlogCategoryCardProps) => {
  const [name, setName] = useState(category.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateCategoryName = async () => {
    if (name.trim() === "") {
      addToast({
        title: "分類名稱不可為空",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "warning",
      });
      setName(category.name);
      setIsEditing(false);
      return;
    }

    if (name === category.name) {
      setIsEditing(false);
      return;
    }

    try {
      const { status } = await updateArticleCategory(category.id, name);
      if (status === 1) {
        addToast({
          title: "分類更新成功",
          description: `${category.name} ➔ ${name}`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
        category.name = name;
        revalidatePath("/");
      }
    } catch (error) {
      addToast({
        title: "分類更新失敗",
        description: String(error),
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-2 animate-appearance-in">
      <CardHeader>
        {isEditing ? (
          <Input
            value={name}
            onValueChange={setName}
            variant="underlined"
            className="animate-appearance-in"
            classNames={{ input: "text-lg font-semibold" }}
          />
        ) : (
          <h3 className="animate-appearance-in text-lg font-semibold p-1 pb-2">
            {category.name}
          </h3>
        )}
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              isIconOnly
              className="animate-appearance-in"
              color="success"
              onPress={updateCategoryName}
            >
              <CheckIcon className="w-5 h-5 text-white" />
            </Button>
            <Button
              isIconOnly
              className="animate-appearance-in"
              color="danger"
              onPress={() => {
                setName(category.name);
                setIsEditing(false);
              }}
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </>
        ) : (
          <>
            <Button
              isIconOnly
              color="primary"
              onPress={() => setIsEditing(true)}
            >
              <EditIcon className="w-5 h-5" />
            </Button>
            <Popover
              placement="right"
              backdrop="opaque"
              showArrow
              isOpen={isDeleting}
              onOpenChange={(open) => setIsDeleting(open)}
            >
              <PopoverTrigger>
                <Button isIconOnly color="danger">
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {(titleProps) => (
                  <div className="flex items-center gap-2 px-1 py-2">
                    <h3 className="text-md font-semibold" {...titleProps}>
                      確認刪除？
                    </h3>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="ghost"
                      size="sm"
                      onPress={async () => {
                        await removeArticleCategory(category.id);
                        setIsEditing(false);
                        setIsDeleting(false);
                      }}
                    >
                      <CheckIcon className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
