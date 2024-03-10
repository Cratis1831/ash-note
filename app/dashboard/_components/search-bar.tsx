"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchBarProps {
  setSearch: (value: string) => void;
  search: string;
}
function SearchBar({ setSearch, search }: SearchBarProps) {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative flex w-full items-center mx-6">
      <Search className="absolute left-2" />
      <Input
        type="search"
        id="search"
        placeholder="Search a note..."
        value={search}
        onChange={(e) => handleSearch(e)}
        className="pl-11 pr-4"
      />
    </div>
  );
}

export default SearchBar;
