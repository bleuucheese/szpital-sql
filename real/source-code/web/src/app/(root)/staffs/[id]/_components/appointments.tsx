import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDateSpecific } from "@/lib/utils";
type Props = {
  appointments: Appointment[];
};

function Appointments({ appointments }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 bg-[#4C4372]">
        <h2 className="text-xl font-semibold text-white p-3">Appointments</h2>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start time</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>
                  {appointment.patient.first_name +
                    " " +
                    appointment.patient.last_name}
                </TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  {convertDateSpecific(appointment.start_time)}
                </TableCell>
                <TableCell>
                  {convertDateSpecific(appointment.end_time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Appointments;
