"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, convertDate } from "@/lib/utils";
import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DateRange } from "react-day-picker";

type Props = {
  histories: Treatment[];
};

function TreatmentHistory({ histories }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date("2014-01-01"),
    to: addDays(new Date(), 20),
  });

  const filteredHistories = histories.filter((history) => {
    const visitedDate = history.visited_date;
    console.log(visitedDate);
    console.log(date);
    return (
      date &&
      date.from &&
      date.to &&
      isWithinInterval(visitedDate, {
        start: date.from,
        end: date.to,
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
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
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
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date(
                new Date().setFullYear(new Date().getFullYear())
              ).getFullYear()}
              showOutsideDays={false}
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableCaption>
          A list of filtered treatment history based on selected date range.
        </TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="">ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Disease</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Visited date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredHistories.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{history.id}</TableCell>
              <TableCell>{history.type}</TableCell>
              <TableCell>{history.disease}</TableCell>
              <TableCell>
                {history.patient.first_name + " " + history.patient.last_name}
              </TableCell>
              <TableCell>{convertDate(history.visited_date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TreatmentHistory;
