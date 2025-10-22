import { ReactNode } from "react";
import { SearchBar } from "./search-bar";

interface MainLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export const MainLayout = ({ sidebar, children }: MainLayoutProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[20%_50%_30%] gap-6">
        {/* Sidebar - Hidden on mobile, visible on large screens */}
        <aside className="hidden lg:block lg:sticky lg:top-20 self-start">
          <div className="max-h-[calc(100vh-3rem)]">{sidebar}</div>
        </aside>

        {/* Main Content */}
        <main className="w-full">{children}</main>

        <aside className="hidden lg:block lg:sticky lg:top-20 self-start">
          <div className="max-h-[calc(100vh-3rem)]">
            <SearchBar
              placeholder="關鍵字搜尋..."
              className="max-w-xs"
              onSearch={(query) => console.log("Search:", query)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};
