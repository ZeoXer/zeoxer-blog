"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { EditIcon, EyeIcon, GlobeIcon, LockIcon, TrashIcon } from "./icons";
import { Switch } from "@heroui/switch";
import { TArticle } from "@/types/article";
import { deleteArticle, updateArticle } from "@/data/article";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { useCategory } from "@/app/use-category";

interface AdminBlogPostCardProps {
  post: TArticle;
}

export const AdminBlogPostCard = ({ post }: AdminBlogPostCardProps) => {
  const [isPublished, setIsPublished] = useState(post.isPublished);
  const { articles, setArticles } = useCategory();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const confirmDeleteArticle = async () => {
    try {
      const { status } = await deleteArticle(post.id);
      if (status === 1) {
        setArticles(articles.filter((article) => article.id !== post.id));
        addToast({
          title: "文章刪除成功",
          description: post.title,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
        onOpenChange();
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const togglePublishStatus = async () => {
    try {
      const newPost = { ...post, isPublished: !isPublished };
      const { status } = await updateArticle(
        newPost.id,
        newPost.title,
        newPost.content,
        newPost.isPublished,
        newPost.categoryId
      );
      if (status === 1) {
        setIsPublished(!isPublished);
        const infoTitle =
          newPost.title.length > 40
            ? newPost.title.slice(0, 40) + "..."
            : newPost.title;
        addToast({
          title: `文章成功${newPost.isPublished ? "發布" : "下架"}`,
          description: `${infoTitle}`,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  return (
    <>
      <Card className="w-full p-2 animate-appearance-in">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-warning line-clamp-1">
            {post.title}
          </h3>
          <div className="flex gap-1 items-center">
            <span className="hidden lg:inline-block text-default-500">
              最後更新
            </span>
            <span className="text-sm lg:text-md text-default-500">
              {post.lastUpdated}
            </span>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end items-center gap-2">
          <Button
            as={Link}
            href={`/admin/preview?id=${post.id}`}
            startContent={<EyeIcon className="w-6" />}
            color="secondary"
          >
            預覽
          </Button>
          <Button
            as={Link}
            href={`/admin/article/${post.id}`}
            startContent={<EditIcon className="w-6" />}
            color="primary"
          >
            編輯
          </Button>
          <Button
            startContent={<TrashIcon className="w-6" />}
            color="danger"
            onPress={onOpen}
          >
            刪除
          </Button>
          <Switch
            color="success"
            size="lg"
            isSelected={isPublished}
            thumbIcon={({ isSelected }) =>
              isSelected ? (
                <GlobeIcon className="w-5 text-black" />
              ) : (
                <LockIcon className="w-5 text-black" />
              )
            }
            onChange={togglePublishStatus}
          />
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="p-2">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl">確認刪除文章</ModalHeader>
              <ModalBody>
                <p>文章刪除後將無法復原，請確認是否要刪除文章：</p>
                <p className="font-semibold">{post.title}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="danger" onPress={confirmDeleteArticle}>
                  確認刪除
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
