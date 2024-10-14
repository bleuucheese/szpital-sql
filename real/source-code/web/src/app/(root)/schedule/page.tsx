import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStaffWithSchedule } from "@/lib/staff";
import { redirect } from "next/navigation";
import React from "react";
import SearchForm from "./_components/search-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UpdateShift from "./_components/update-shift";
type Props = {
  searchParams: {
    page: string;
    searchQuery: string;
  };
};

async function SchedulePage({ searchParams: { page, searchQuery } }: Props) {
  const currentPage = page ? Number(page) : 1;
  const searchTerm = searchQuery || "";
  const { staffs, totalPages } = await getStaffWithSchedule(
    page ? Number(page) : 1,
    5,
    searchTerm
  );
  if (currentPage > totalPages) {
    redirect("/schedule?page=1");
  }

  return (
    <main className="rounded-lg bg-[#D4EAF6] flex-1 space-y-7 flex flex-col justify-center p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Schedule</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <SearchForm searchQuery={searchQuery} />
      </section>
      <section className="flex justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold">Staff Schedule</h2>
          <Link href={"/booking"}>
            <Button> Book an appointment</Button>
          </Link>
          <Link href={"/cancel"}>
            <Button variant={"destructive"}> Cancel an appointment</Button>
          </Link>
        </div>
        <div>
          {/* Pagination */}
          <Link
            href={`/schedule?page=${
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
            href={`/schedule?page=${
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
      <section className="border overflow-y-scroll">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>Staff</TableHead>
              <TableHead>Shifts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff, i) => (
              <TableRow key={i}>
                <TableCell className="border">
                  {staff.first_name} {staff.last_name}
                </TableCell>
                <TableCell>
                  <div className="border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day of Week</TableHead>
                          <TableHead>Start hour</TableHead>
                          <TableHead>End hour</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff.shifts.map((shift, i) => (
                          <TableRow key={i}>
                            <TableCell>{shift.day_of_week}</TableCell>
                            <TableCell>{shift.start_hour}</TableCell>
                            <TableCell>{shift.end_hour}</TableCell>
                            <TableCell>
                              <UpdateShift shift={shift} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default SchedulePage;
