"use client";
import React from "react";

import { convertDate } from "@/lib/utils";

import UpdateStaff from "./update-staff";
type Props = {
  staff: Staff;
  departments: Department[];
};
function PersonalInformation({ staff, departments }: Props) {
  return (
    <div className="bg-[#D4EAF6] flex flex-col space-y-3 rounded-md p-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <UpdateStaff departments={departments} staff={staff} />
      </div>

      <p>
        {" "}
        <span className="font-semibold">ID: </span> {staff.id}
      </p>
      <p>
        <span className="font-semibold">First name: </span>
        {staff.first_name}
      </p>
      <p>
        <span className="font-semibold">Last name: </span>
        {staff.last_name}
      </p>

      <p>
        <span className="font-semibold">Date of birth: </span>
        {convertDate(staff.dob)}
      </p>

      <p>
        <span className="font-semibold">Job Type: </span>
        {staff.job_type}
      </p>
      <p>
        <span className="font-semibold">Salary: </span>
        {staff.salary}
      </p>
      <p>
        <span className="font-semibold">Hired date: </span>
        {convertDate(staff.hired_date)}
      </p>
      <p>
        <span className="font-semibold">Department: </span>
        {staff.department.name}
      </p>
    </div>
  );
}

export default PersonalInformation;
