import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Props = {
  shifts: Shift[];
};

function Shifts({ shifts }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 bg-[#4C4372]">
        <h2 className="text-xl font-semibold text-white p-3">Shifts</h2>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Day of week</TableHead>
              <TableHead>Start hour</TableHead>
              <TableHead>End hour</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.id}</TableCell>
                <TableCell>{shift.day_of_week}</TableCell>
                <TableCell>{shift.start_hour}</TableCell>
                <TableCell>{shift.end_hour}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Shifts;
