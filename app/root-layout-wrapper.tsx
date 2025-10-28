"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminNavbar, Navbar } from "@/components/navbar";
import { PageFooter } from "@/components/page-footer";
import { CategoryProvider } from "./use-category";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <CategoryProvider>
      <div className="relative flex flex-col h-screen">
        {isAdmin ? <AdminNavbar /> : <Navbar />}
        <main className="container mx-auto max-w-7xl pt-16 px-4 sm:px-6 flex-grow">
          {children}
        </main>
        {!isAdmin && <PageFooter year={new Date().getFullYear()} />}
      </div>
    </CategoryProvider>
  );
}
