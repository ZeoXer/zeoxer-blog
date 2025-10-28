"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { EditIcon, GlobeIcon, LockIcon, TrashIcon } from "./icons";
import { Switch } from "@heroui/switch";

interface AdminBlogPostCardProps {
  id: number;
  title: string;
  isPublished: boolean;
  lastUpdated: string;
}

export const AdminBlogPostCard = ({
  id,
  title,
  isPublished,
  lastUpdated,
}: AdminBlogPostCardProps) => {
  const deleteArticle = () => {
    // Implement delete functionality here
  };

  const togglePublishStatus = () => {
    // Implement publish/unpublish functionality here
  };

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-warning">{title}</h3>
        <span className="text-default-500">最後更新 {lastUpdated}</span>
      </CardHeader>
      <CardFooter className="flex justify-end items-center gap-2">
        <Button
          as={Link}
          href={`/admin/article/${id}`}
          isIconOnly
          color="primary"
        >
          <EditIcon className="w-6" />
        </Button>
        <Button isIconOnly color="danger" onPress={deleteArticle}>
          <TrashIcon className="w-6" />
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
  );
};
