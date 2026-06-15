"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const ROTATING_PLACEHOLDERS = [
  "搜尋文章標題或內文...",
  "想找什麼技術筆記？",
  "輸入關鍵字試試看",
  "Endpoint-first / Repository / Aceternity...",
];

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <PlaceholdersAndVanishInput
      placeholders={ROTATING_PLACEHOLDERS}
      onChange={(e) => onSearch && onSearch(e.target.value)}
      onSubmit={() => onSearch && onSearch("")}
    />
  );
};
