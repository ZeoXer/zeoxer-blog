"use client";

import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = "Search",
  onSearch,
  className = "",
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
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
      onChange={handleChange}
    />
  );
};
