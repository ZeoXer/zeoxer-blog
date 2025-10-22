"use client";

import { Button } from "@heroui/button";

interface PageFooterProps {
  year?: number;
  onAdminClick?: () => void;
}

export const PageFooter = ({
  year = new Date().getFullYear(),
  onAdminClick,
}: PageFooterProps) => {
  return (
    <footer className="w-full border-t border-divider py-8 mt-16">
      <div className="flex flex-col items-center gap-4">
        <p className="text-default-600">Copyright@{year}</p>
        <Button variant="bordered" size="md" onPress={onAdminClick}>
          管理者登入
        </Button>
      </div>
    </footer>
  );
};
