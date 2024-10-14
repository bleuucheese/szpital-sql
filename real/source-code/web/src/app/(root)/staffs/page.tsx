import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllStaff } from "@/lib/staff";
import { convertDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import SearchForm from "./_components/search-form";
import CreateStaff from "./_components/create-staff";
import { getAllDepartments } from "@/lib/department";
import ChangeDepartment from "./_components/change-department";
import ChangeOrder from "./_components/name-order";
import DeleteStaff from "./_components/delete-staff";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
type Props = {
  searchParams: {
    page: string;
    searchQuery: string;
    department: string;
    sort: string;
  };
};

async function StaffsPage({
  searchParams: { page, searchQuery, department, sort },
}: Props) {
  const currentPage = page ? Number(page) : 1;
  const searchTerm = searchQuery || "";
  const currentDepartment = department || "";
  const currentSort = sort || "FA";
  const { staffs, totalPages } = await getAllStaff(
    page ? Number(page) : 1,
    5,
    searchTerm,
    currentDepartment,
    currentSort
  );
  const departments: Department[] = await getAllDepartments();
  return (
    <main className="rounded-lg bg-[#D4EAF6] flex-1 space-y-7 flex flex-col justify-center p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Staff</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <SearchForm
          searchQuery={searchQuery}
          currentDepartment={currentDepartment}
          currentSort={currentSort}
        />
      </section>
      <section className="flex justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold">List Of Staffs</h2>
          <CreateStaff departments={departments} />
          <ChangeDepartment
            currentSort={currentSort}
            searchTerm={searchTerm}
            currentDepartment={currentDepartment}
            departments={departments}
          />
          <ChangeOrder
            currentSort={currentSort}
            searchTerm={searchTerm}
            currentDepartment={currentDepartment}
          />
        </div>
        <div>
          {/* Previous Page Button */}
          <Link
            href={`/staffs?page=${
              currentPage > 1 ? currentPage - 1 : 1
            }&searchQuery=${searchTerm}`}
            passHref
          >
            <Button variant={"outline"} disabled={currentPage <= 1}>
              {"<"}
            </Button>
          </Link>

          {/* Next Page Button */}
          <Link
            href={`/staffs?page=${
              currentPage < totalPages ? currentPage + 1 : totalPages
            }&searchQuery=${searchTerm}`}
            passHref
          >
            <Button variant={"outline"} disabled={currentPage >= totalPages}>
              {">"}
            </Button>
          </Link>
        </div>
      </section>
      <section className="gap-5">
        <Table className="bg-white rounded-md">
          <TableCaption>A list of patients.</TableCaption>
          <TableHeader>
            <TableRow className="">
              <TableHead className="">ID</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Job type</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Hired date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff: Staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.first_name}</TableCell>
                <TableCell>{staff.last_name}</TableCell>
                <TableCell>{convertDate(staff.dob)}</TableCell>
                <TableCell>{staff.job_type}</TableCell>
                <TableCell>{staff.salary}</TableCell>
                <TableCell>{staff.department_name}</TableCell>
                <TableCell>{convertDate(staff.hired_date)}</TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <Link href={`/staffs/${staff.id}`}>
                      <Button>View</Button>
                    </Link>
                    <DeleteStaff id={staff.id.toString()} isListPage />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}

export default StaffsPage;
