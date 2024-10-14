import { getPatientById } from "@/lib/patient";
import { convertDate } from "@/lib/utils";
import React from "react";
import PersonalInformation from "./_components/personal-information";
import Address from "./_components/address";
import Allergy from "./_components/allergy";
import TreatmentHistory from "./_components/treatment-history";
import DeletePatient from "./_components/delete-patient";
import { redirect } from "next/navigation";
import { getAllergies } from "@/lib/allergy";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
type Props = {
  params: {
    id: string;
  };
};

async function PatientDetailPage({ params: { id } }: Props) {
  const [patient, allergies] = await Promise.all([
    getPatientById(+id),
    getAllergies(),
  ]);
  if (!patient) {
    redirect("/patients");
  }
  return (
    <main className="rounded-lg h-full bg-[#D4EAF6] flex flex-col justify-center items-stretch flex-1 p-5 space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {patient.first_name} {patient.last_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex justify-between">
        <h1 className="text-4xl font-bold">Patient Information</h1>
        <DeletePatient id={id} isListPage={false} />
      </section>
      <section className="rounded-lg overflow-y-scroll p-5 bg-white space-y-5">
        <PersonalInformation patient={patient} />

        <Address patient={patient} />

        <div className="space-y-5 flex-1">
          <Allergy allergies={allergies} patient={patient} />
          <TreatmentHistory patient={patient} />
        </div>
      </section>
    </main>
  );
}

export default PatientDetailPage;
