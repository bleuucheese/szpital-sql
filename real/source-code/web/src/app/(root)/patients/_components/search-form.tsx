"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  searchQuery: string;
};

function SearchForm({ searchQuery }: Props) {
  // State to store search query
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const router = useRouter();
  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle the search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/patients?page=1&searchQuery=${searchTerm}`);
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <Input
        type="text"
        placeholder="Find by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default SearchForm;
