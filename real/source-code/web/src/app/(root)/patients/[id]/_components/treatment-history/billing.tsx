import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type Props = {
  billing: Billing;
  convertDate: (date: Date) => string;
};

function Billing({ billing, convertDate }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Billing</h2>
      <div className="border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Billing date</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Payment status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{billing.amount}</TableCell>
              <TableCell>{convertDate(billing.billing_date)}</TableCell>
              <TableCell>{convertDate(billing.due_date)}</TableCell>
              <TableCell>{billing.payment_status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Billing;
