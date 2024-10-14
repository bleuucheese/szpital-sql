"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  currentSort: string;
  searchTerm: string;
  currentDepartment: string;
};

function ChangeOrder({ currentSort, searchTerm, currentDepartment }: Props) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState(currentSort);

  useEffect(() => {
    setSelectedSort(currentSort); // Updates the selected sort when external changes occur
  }, [currentSort]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value); // Update state immediately for better UI response
    router.push(
      `/staffs?page=1&searchQuery=${searchTerm}&currentDepartment=${currentDepartment}&sort=${value}`
    );
  };
  return (
    <Select onValueChange={handleSortChange} defaultValue={currentSort}>
      <SelectTrigger className="w-[180px]" aria-label="Sort by">
        <SelectValue>{selectedSort || "Select Sort Option"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="FA">First Name Ascending</SelectItem>
        <SelectItem value="FD">First Name Descending</SelectItem>
        <SelectItem value="LA">Last Name Ascending</SelectItem>
        <SelectItem value="LD">Last Name Descending</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ChangeOrder;
