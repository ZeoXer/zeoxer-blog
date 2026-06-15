"use client";

import { TCategory } from "@/types/article";
import { Card, CardBody } from "@heroui/card";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { InfoIcon } from "./icons";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  categories: TCategory[];
  activeCategory?: number;
  onCategoryClick?: (categoryId: number) => void;
  isClient?: boolean;
}

type Item = { id: number; label: string; icon?: React.ReactNode };

const buildItems = (
  categories: TCategory[],
  isClient: boolean
): Item[] => {
  const items: Item[] = [];
  if (isClient) {
    items.push({ id: 0, label: "關於本站", icon: <InfoIcon className="w-5" /> });
  }
  for (const c of categories) {
    items.push({ id: c.id, label: c.name, icon: c.icon });
  }
  return items;
};

const SidebarItem = ({
  item,
  active,
  onClick,
}: {
  item: Item;
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-left transition-colors",
        active ? "text-warning" : "text-default-700 hover:text-warning/80"
      )}
    >
      {active && (
        <motion.span
          layoutId="active-category-pill"
          className="absolute inset-0 rounded-lg bg-warning/15 dark:bg-warning/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 text-default-500">{item.icon}</span>
      <span className="relative z-10">{item.label}</span>
    </button>
  );
};

export const CategorySidebar = ({
  categories,
  activeCategory,
  onCategoryClick,
  isClient = false,
}: CategorySidebarProps) => {
  const items = buildItems(categories, isClient);
  return (
    <Card className="w-full">
      <CardBody className="p-6">
        <h2 className="text-xl font-semibold mb-4">所有分類</h2>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeCategory === item.id}
              onClick={() => onCategoryClick?.(item.id)}
            />
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
  const items = buildItems(categories, false);

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
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    active={activeCategory === item.id}
                    onClick={() => {
                      onCategoryClick?.(item.id);
                      onOpenChange();
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
