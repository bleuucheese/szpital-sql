import { Button } from "@/components/ui/button";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getAllPatients } from "@/lib/patient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDate } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import DeletePatient from "./[id]/_components/delete-patient";
import { redirect } from "next/navigation";
import CreatePatient from "./_components/create-patient";
import { Input } from "@/components/ui/input";
import SearchForm from "./_components/search-form";
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

async function PatientsPage({ searchParams: { page, searchQuery } }: Props) {
  // Default to page 1 if 'page' is not provided in searchParams
  const currentPage = page ? Number(page) : 1;
  const searchTerm = searchQuery || "";
  const { patients, totalPages } = await getAllPatients(
    page ? Number(page) : 1,
    5,
    searchTerm
  );
  // if (currentPage > totalPages) {
  //   redirect("/patients?page=1");
  // }
  return (
    <main className="rounded-lg bg-[#D4EAF6] flex-1 space-y-7 flex flex-col justify-center p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Patients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SearchForm searchQuery={searchTerm} />

      <section className="flex justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold">List Of Patients</h2>
          <CreatePatient />
        </div>
        <div>
          {/* Previous Page Button */}
          <Link
            href={`/patients?page=${
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
            href={`/patients?page=${
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
              <TableHead>Gender</TableHead>
              <TableHead>Date Of Birth</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.first_name}</TableCell>
                <TableCell>{patient.last_name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{convertDate(patient.dob)}</TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <Link href={`/patients/${patient.id}`}>
                      <Button>View </Button>
                    </Link>
                    <DeletePatient id={patient.id.toString()} isListPage />
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

export default PatientsPage;
