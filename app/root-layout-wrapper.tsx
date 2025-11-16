"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AdminNavbar, Navbar } from "@/components/navbar";
import { PageFooter } from "@/components/page-footer";
import { CategoryProvider } from "./use-category";
import { FullPageLoading, useLoading } from "@/app/use-loading";
import clsx from "clsx";

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isAdmin = pathname.startsWith("/admin");
  const { isLoading } = useLoading();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window || !cursorRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      cursorRef.current!.style.left = x - 20 + "px";
      cursorRef.current!.style.top = y - 20 + "px";
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <CategoryProvider>
      <div
        className={clsx(
          "relative flex flex-col h-screen",
          isLoading && "overflow-hidden"
        )}
      >
        {isAdmin ? <AdminNavbar /> : <Navbar />}
        <main className="container mx-auto max-w-7xl pt-16 px-4 sm:px-6 flex-grow">
          {children}
        </main>
        {!isAdmin && <PageFooter year={new Date().getFullYear()} />}
      </div>
      <div
        className="w-10 h-10 rounded-full bg-warning opacity-40 fixed pointer-events-none z-[100] shadow-md"
        ref={cursorRef}
      />
      {isLoading && <FullPageLoading />}
    </CategoryProvider>
  );
}
