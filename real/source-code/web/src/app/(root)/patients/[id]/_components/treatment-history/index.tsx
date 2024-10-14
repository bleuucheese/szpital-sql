"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Billing from "./billing";
import { convertDate } from "@/lib/utils";
import AddLabResult from "./add-lab-result";
import UploadImage from "./upload-image";
import AddNote from "./add-note";
import { getAllDoctorNotesByProcedureId } from "@/lib/doctor-note";
import { getAllLabResultsByProcedureId } from "@/lib/lab-result";
import { getAllDiagnosticsByProcedureId } from "@/lib/diagnostic";
import Image from "next/image";
import { addDays, format, isWithinInterval } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
type Props = {
  patient: Patient;
};

function TreatmentHistory({ patient }: Props) {
  const [doctorNotes, setDoctorNotes] = useState<Record<number, any[]>>({});
  const [labResults, setLabResults] = useState<Record<number, any[]>>({});
  const [diagnosticImages, setDiagnosticImages] = useState<
    Record<number, any[]>
  >({});
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2014-01-01"),
    to: addDays(new Date(), 20),
  });
  useEffect(() => {
    patient.treatmentHistories.forEach((history) => {
      history.procedures.forEach(async (procedure) => {
        const [notes, result, images] = await Promise.all([
          getAllDoctorNotesByProcedureId(procedure.id),
          getAllLabResultsByProcedureId(procedure.id),
          getAllDiagnosticsByProcedureId(procedure.id),
        ]);
        console.log(images.data);
        setDoctorNotes((prevNotes) => ({
          ...prevNotes,
          [procedure.id]: notes.data, // Assuming the response structure has the notes in 'data' key
        }));
        setLabResults((prevResults) => ({
          ...prevResults,
          [procedure.id]: result.data, // Adjust according to your actual API response structure
        }));
        setDiagnosticImages((prevImages) => ({
          ...prevImages,
          [procedure.id]: images.data, // Adjust according to your actual API response structure
        }));
      });
    });
  }, [patient]);
  const filteredHistories = patient.treatmentHistories.filter((history) => {
    const visitedDate = new Date(history.visited_date);
    return (
      dateRange?.from &&
      dateRange.to &&
      isWithinInterval(visitedDate, {
        start: dateRange.from,
        end: dateRange.to,
      })
    );
  });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-white bg-[#4C4372] p-3">
        Treatment History
      </h2>
      <div className={"grid gap-2"}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className="w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "LLL dd, y")} - ${format(
                    dateRange.to,
                    "LLL dd, y"
                  )}`
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date(
                new Date().setFullYear(new Date().getFullYear())
              ).getFullYear()}
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      </div>
      {filteredHistories.map((history) => (
        <div
          key={history.id}
          className="bg-[#D4EAF6] flex flex-col space-y-3 p-5"
        >
          <p>
            {" "}
            <span className="font-semibold">Type: </span> {history.type}
          </p>
          <p>
            <span className="font-semibold">Disease: </span> {history.disease}
          </p>
          <p>
            <span className="font-semibold">Visited date:</span>{" "}
            {convertDate(history.visited_date)}
          </p>

          <div className="border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Visited date</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Lab result</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.procedures.map((procedure) => (
                  <TableRow key={procedure.id}>
                    <TableCell>{procedure.category}</TableCell>
                    <TableCell>
                      {" "}
                      {procedure.medicine && (
                        <div>
                          <p>
                            <span className="font-semibold">Name: </span>
                            {procedure.medicine?.name}
                          </p>
                          <p>
                            <span className="font-semibold">Price: </span>
                            {procedure.medicine?.price}
                          </p>
                          <p>
                            <span className="font-semibold">Quantity: </span>
                            {procedure.medicine_quantity}
                          </p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{procedure.price}</TableCell>
                    <TableCell>
                      {convertDate(procedure.performed_date)}
                    </TableCell>
                    <TableCell>
                      <Link href={`/staffs/${procedure.staff?.id}`}>
                        <Button variant={"link"} className="p-0">
                          {procedure.staff?.first_name}{" "}
                          {procedure.staff?.last_name}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {labResults[procedure.id]?.map((result, index) => (
                          <div
                            key={index}
                            className="bg-[#4C4372] rounded-md p-3 text-white"
                          >
                            <p>
                              <strong>Type:</strong> {result.lab_type}
                            </p>
                            <p>
                              <strong>Description:</strong> {result.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </TableCell>{" "}
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {diagnosticImages[procedure.id]?.map((image, index) => (
                          <Image
                            alt={image.image_type}
                            src={image.image_url}
                            width={100}
                            height={100}
                            key={index}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {doctorNotes[procedure.id]?.map((note, index) => (
                          <p key={index}>
                            {" "}
                            <span className="font-semibold">Note:</span>{" "}
                            {note.content}
                          </p> // Example: assuming each note has a 'content' property
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-x-3">
                        <AddLabResult procedure_id={procedure.id} />
                        <UploadImage procedure_id={procedure.id} />
                        <AddNote procedure_id={procedure.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Billing billing={history.billing} convertDate={convertDate} />
        </div>
      ))}
    </div>
  );
}

export default TreatmentHistory;
