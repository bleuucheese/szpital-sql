import React from "react";
import DeleteStaff from "../_components/delete-staff";
import PersonalInformation from "./_components/persona-information";
import { getStaffById } from "@/lib/staff";
import { getAllDepartments } from "@/lib/department";
import Procedures from "./_components/procedures";
import Appointments from "./_components/appointments";
import Shifts from "./_components/shifts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Certification from "./_components/certification";
import { getCerti } from "@/lib/certi";
type Props = {
  params: {
    id: string;
  };
};

async function StaffDetailPage({ params: { id } }: Props) {
  // Assuming getStaffById and getAllDepartments are asynchronous functions that return a Staff and an array of Department respectively.
  const [staff, departments, certificates] = (await Promise.all([
    getStaffById(+id),
    getAllDepartments(),
    getCerti(+id),
  ])) as [Staff, Department[], Certificate[]];
  console.log(certificates);
  console.log(staff.appointments);
  return (
    <main className="rounded-lg h-full bg-[#D4EAF6] flex flex-col justify-center items-stretch flex-1 p-5 space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/staffs">Staffs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {staff.first_name + " " + staff.last_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex justify-between">
        <h1 className="text-4xl font-bold">Staff Information</h1>
        <DeleteStaff id={id} isListPage={false} />
      </section>
      <section className="rounded-lg overflow-y-scroll p-5 bg-white space-y-5">
        <PersonalInformation staff={staff} departments={departments} />
        <Certification certificates={certificates} staff_id={staff.id} />
        {staff.procedures.length > 0 && (
          <Procedures procedures={staff.procedures} />
        )}
        <Appointments appointments={staff.appointments} />
        <Shifts shifts={staff.shifts} />
      </section>
    </main>
  );
}

export default StaffDetailPage;
