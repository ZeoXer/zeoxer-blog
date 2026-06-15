"use client";

import { Link } from "@heroui/link";
import { Meteors } from "@/components/ui/meteors";

interface PageFooterProps {
  year?: number;
  onAdminClick?: () => void;
}

export const PageFooter = ({
  year = new Date().getFullYear(),
}: PageFooterProps) => {
  return (
    <footer className="relative w-full border-t border-divider min-h-[5rem] mt-16 overflow-hidden flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={20} />
      </div>
      <p className="relative z-10 text-default-600">
        Copyright© {year}{" "}
        <Link href="/admin/article" color="foreground" underline="hover">
          ZeoXer
        </Link>
        . All Rights Reserved.
      </p>
    </footer>
  );
};
