import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllAppointment } from "@/lib/appointment";
import CancelAppointment from "./_components/cancel-appointment";
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
  };
};

async function CancelAppointmentPage({
  searchParams: { page, searchQuery },
}: Props) {
  const currentPage = page ? Number(page) : 1;
  const searchTerm = searchQuery || "";
  const { appointments, totalPages } = await getAllAppointment(
    currentPage,
    5,
    searchTerm
  );
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Manually construct the formatted date string
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;

    return formattedDate;
  };
  return (
    <main className="rounded-lg bg-[#D4EAF6] flex-1 space-y-7 flex flex-col justify-center p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/schedule">Schedule</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cancel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>{/* <SearchForm searchQuery={searchQuery} /> */}</section>
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
      <section className="border overflow-y-scroll">
        <Table className="bg-white rounded-md">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Staff</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>EndTime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {appointment.staff.first_name} {appointment.staff.last_name}
                </TableCell>
                <TableCell>
                  {appointment.patient.first_name}{" "}
                  {appointment.patient.last_name}
                </TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>{formatDate(appointment.start_time)}</TableCell>
                <TableCell>{formatDate(appointment.end_time)}</TableCell>
                <TableCell>
                  <CancelAppointment appointmentId={appointment.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}

export default CancelAppointmentPage;
