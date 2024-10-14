import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TreatmentHistory from "./_components/treatment-history";
import { getAllTreatmentHistories } from "@/lib/treatment-history";
type Props = {};

async function ReportPage({}: Props) {
  const histories = await getAllTreatmentHistories();
  return (
    <main className="rounded-lg bg-[#D4EAF6] flex-1 space-y-7 flex flex-col justify-center p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Report</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold">Report management</h1>
      <section className="rounded-lg overflow-y-scroll p-5 bg-white space-y-5">
        <TreatmentHistory histories={histories} />
      </section>
    </main>
  );
}

export default ReportPage;
