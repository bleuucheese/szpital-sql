"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  departments: Department[];
  currentDepartment: string;
    searchTerm: string;
    currentSort: string;
};

function ChangeDepartment({ departments, currentDepartment,searchTerm,currentSort }: Props) {
  // Function to handle department change
  const router = useRouter();
  const handleDepartmentChange = (value: string) => {
    // If "all" is selected, remove the department filter
    const departmentQueryParam = value === "all" ? "" : value;
    router.push(
      `/staffs?page=1&searchQuery=${searchTerm}&department=${departmentQueryParam}&sort=${currentSort}`
    );
  };
  return (
    <Select
      onValueChange={handleDepartmentChange}
      defaultValue={currentDepartment}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
          <SelectContent>
          <SelectItem value="all">
            All
          </SelectItem>
        {departments.map((dept) => (
          <SelectItem key={dept.id} value={dept.name}>
            {dept.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ChangeDepartment;
