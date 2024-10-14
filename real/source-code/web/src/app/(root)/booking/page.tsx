import React from "react";
import BookingForm from "./_components/booking-form";
import { getAllStaff, getAllStaffs } from "@/lib/staff";
import { getAllPatientsForAppointment } from "@/lib/patient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
type Props = {};

async function BookingPage({}: Props) {
  const staffs = await getAllStaffs();
  const patients = await getAllPatientsForAppointment();
  console.log(staffs);
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
            <BreadcrumbPage>Booking</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="bg-white flex-1 rounded-md p-3 flex flex-col space-y-7 justify-center items-center">
        <h2 className="text-2xl font-semibold">Book an appointment</h2>
        <BookingForm staffs={staffs} patients={patients} />
      </section>
    </main>
  );
}

export default BookingPage;
