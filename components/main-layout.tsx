import { ReactNode } from "react";

interface MainLayoutProps {
  leftSidebar: ReactNode;
  children: ReactNode;
  rightSidebar?: ReactNode;
  lgLayoutRatio?: string; // Optional lg layout ratio, e.g., "lg:grid-cols-[20%_60%_20%]"
}

export const MainLayout = ({
  leftSidebar,
  children,
  rightSidebar,
  lgLayoutRatio = "lg:grid-cols-[1fr_2fr_1fr]",
}: MainLayoutProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className={`grid grid-cols-1 ${lgLayoutRatio} gap-8`}>
        {/* Sidebar - Hidden on mobile, visible on large screens */}
        <aside className="hidden lg:block lg:sticky lg:top-20 self-start">
          <div className="max-h-[calc(100vh-3rem)]">{leftSidebar}</div>
        </aside>

        {/* Main Content */}
        <main className="w-full">{children}</main>

        <aside className="hidden lg:block lg:sticky lg:top-20 self-start">
          <div className="max-h-[calc(100vh-3rem)]">{rightSidebar}</div>
        </aside>
      </div>
    </div>
  );
};
