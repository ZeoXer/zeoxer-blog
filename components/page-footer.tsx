"use client";

import { Link } from "@heroui/link";

interface PageFooterProps {
  year?: number;
  onAdminClick?: () => void;
}

export const PageFooter = ({
  year = new Date().getFullYear(),
}: PageFooterProps) => {
  return (
    <footer className="w-full border-t border-divider py-6 mt-16">
      <div className="flex flex-col items-center gap-4">
        <p className="text-default-600">
          Copyright© {year}{" "}
          <Link href="/admin/article" color="foreground" underline="hover">
            ZeoXer
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
