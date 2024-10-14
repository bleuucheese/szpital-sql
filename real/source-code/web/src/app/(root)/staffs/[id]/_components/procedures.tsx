import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDate } from "@/lib/utils";
type Props = {
  procedures: Procedure[];
};

function Procedures({ procedures }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 bg-[#4C4372]">
        <h2 className="text-xl font-semibold text-white p-3">Certification</h2>
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Perform Date</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {procedures.map((procedure) => (
              <TableRow key={procedure.id}>
                <TableCell>{procedure.id}</TableCell>
                <TableCell>
                  {procedure.patient.first_name +
                    " " +
                    procedure.patient.last_name}
                </TableCell>
                <TableCell>{procedure.category}</TableCell>
                <TableCell>
                  {procedure.medicine?.name}({procedure.medicine?.price}) x{" "}
                  {procedure.medicine_quantity}
                </TableCell>
                <TableCell>{convertDate(procedure.performed_date)}</TableCell>
                <TableCell>{procedure.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Procedures;
