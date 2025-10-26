"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Search",
  className = "",
  onSearch,
}: SearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Input
      classNames={{
        base: className,
        inputWrapper: "bg-default-100",
      }}
      placeholder={placeholder}
      size="lg"
      startContent={<SearchIcon className="text-default-400" />}
      type="search"
      onChange={handleSearch}
    />
  );
};
