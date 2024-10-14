import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import DeleteAllergy from "./delete-allergy";
import AddAllergy from "./add-allergy";

type Props = {
  patient: Patient;
  allergies: Allergy[];
};

function Allergy({ patient, allergies }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 bg-[#4C4372]">
        <h2 className="text-xl font-semibold text-white p-3">Allergy</h2>
        <AddAllergy patient={patient} allergies={allergies} />
      </div>

      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Allergen</TableHead>
              <TableHead>Symptoms</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patient.allergies.map((allergy) => (
              <TableRow key={allergy.id}>
                <TableCell>{allergy.allergen}</TableCell>
                <TableCell>{allergy.symptoms}</TableCell>
                <TableCell>{allergy.category}</TableCell>
                <TableCell>{allergy.severity}</TableCell>
                <TableCell>
                  <DeleteAllergy
                    allergyId={allergy.id}
                    patientId={patient.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Allergy;
