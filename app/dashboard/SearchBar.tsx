"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
// import { debounce, set } from "lodash";

function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // debounce(() => setSearch(e.target.value), 300);
    setSearch(e.target.value);
  };
  return (
    <div className="relative flex w-full max-w-xl items-center mx-6">
      <Search className="absolute left-2" />
      <Input
        type="search"
        placeholder="Search a note..."
        value={search}
        onChange={(e) => handleSearch(e)}
        className="pl-11 pr-4"
      />
    </div>
  );
}

export default SearchBar;
