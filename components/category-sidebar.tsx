"use client";

import { TCategory } from "@/types/article";
import { Card, CardBody } from "@heroui/card";
import { Drawer, DrawerContent, DrawerHeader } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Link } from "@heroui/link";
import { InfoIcon } from "./icons";
import { Divider } from "@heroui/divider";

interface CategorySidebarProps {
  categories: TCategory[];
  activeCategory?: number;
  onCategoryClick?: (categoryId: number) => void;
  isClient?: boolean;
}

export const CategorySidebar = ({
  categories,
  activeCategory,
  onCategoryClick,
  isClient = false,
}: CategorySidebarProps) => {
  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <h2 className="text-xl font-semibold mb-4">所有分類</h2>
        {isClient && (
          <>
            <Divider className="mt-2 mb-1" />
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer text-default-700 font-semibold ${
                activeCategory === 0 ? "bg-default-100" : "hover:bg-default-50"
              }`}
              onPress={() => onCategoryClick?.(0)}
            >
              <InfoIcon className="w-5" />
              關於本站
            </Link>
            <Divider className="my-1" />
          </>
        )}
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
              <span className="text-default-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export const MobileCategorySidebar = ({
  categories,
  activeCategory,
  onCategoryClick,
}: CategorySidebarProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="lg:hidden sticky self-start top-4 z-20 mb-4"
        size="lg"
        color="warning"
      >
        分類選單
      </Button>
      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="sm"
        backdrop="blur"
      >
        <DrawerContent>
          <div className="w-full">
            <div className="p-6">
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
                    onPress={() => {
                      onCategoryClick?.(category.id);
                      onOpenChange();
                    }}
                  >
                    <span className="text-default-500">{category.icon}</span>
                    <span className="text-default-700">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
