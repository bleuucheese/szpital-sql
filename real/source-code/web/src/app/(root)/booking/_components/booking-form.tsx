"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  checkAppointmentAvailability,
  createAppointment,
} from "@/lib/appointment";
import { getAllStaff } from "@/lib/staff";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  staffs: Staff[];
  patients: Patient[];
};
const formSchema = z.object({
  date: z.date(),
  start_time: z.string(),
  end_time: z.string(),
  staff_id: z.number(),
  patient_id: z.number(),
  purpose: z.string(),
});
function BookingForm({ staffs, patients }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      start_time: "00:00", // Default time set to midnight in 24-hour format
      end_time: "00:00",
      staff_id: 0,
      patient_id: 0,
      purpose: "",
    },
  });
  const [staffOpen, setStaffOpen] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [staffDisplayName, setStaffDisplayName] = useState("Select staff...");
  const [patientDisplayName, setPatientDisplayName] =
    useState("Select patient...");
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const filteredStaffs = staffs.filter((staff) =>
    `${staff.first_name} ${staff.last_name}`
      .toLowerCase()
      .includes(staffSearchTerm.toLowerCase())
  );
  const filteredPatients = patients.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(patientSearchTerm.toLowerCase())
  );
  const formatTimeWithSeconds = (time: any) => {
    return `${time}:00`;
  };
  function toISOStringInUTC(date: Date) {
    // Convert date to UTC format
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
  }
  const convertDateToInputValue = (date: Date | string) => {
    if (typeof date === "string") {
      date = new Date(date); // Convert string to Date object if necessary
    }
    return date.toISOString().split("T")[0];
  };
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = {
      purpose: data.purpose,
      status: "BOOKED",
      start_time: formatTimeWithSeconds(data.start_time),
      end_time: formatTimeWithSeconds(data.end_time),
      date: toISOStringInUTC(new Date(data.date)),
      staff_id: data.staff_id,
      patient_id: data.patient_id,
    };
    setIsLoading(true);
    const res = await createAppointment(formattedData);
    if (res.status === 201) {
      toast(res.statusText, { duration: 1000 });
      router.push(`/staffs/${data.staff_id}`);
      router.refresh();
    } else {
      toast(res.statusText, { duration: 1000 });
    }
    setIsLoading(false);
  }
  const checkAvailability = async () => {
    const formValues = form.getValues();
    const formattedData = {
      date: toISOStringInUTC(new Date(formValues.date)),
      start_time: formatTimeWithSeconds(formValues.start_time),
      end_time: formatTimeWithSeconds(formValues.end_time),
      staff_id: formValues.staff_id,
    };
    const res = await checkAppointmentAvailability(formattedData);
    if (res) {
      setIsAvailable(true);
      toast("The appointment is available.", { duration: 1000 });
    }
    else {
      toast("The appointment is not available.", { duration: 1000 });
    }

  };
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-[#D4EAF6] rounded-md">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="staff_id"
            render={({ field }) => (
              <FormItem className="space-y-3 flex flex-col">
                <FormLabel>Staff</FormLabel>
                <FormControl>
                  <Popover open={staffOpen} onOpenChange={setStaffOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={staffOpen}
                        className="w-[200px] justify-between"
                      >
                        {staffDisplayName}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search staff..."
                          onValueChange={(value) => {
                            setStaffSearchTerm(value);
                          }}
                        />
                        <CommandList>
                          {filteredStaffs.length > 0 ? (
                            <CommandGroup>
                              {filteredStaffs.map((staff) => (
                                <CommandItem
                                  key={staff.id}
                                  value={`${staff.first_name} ${staff.last_name}`}
                                  onSelect={() => {
                                    // setValue(staff.id.toString());
                                    setStaffDisplayName(
                                      `${staff.first_name} ${staff.last_name}`
                                    );
                                    field.onChange(Number(staff.id));
                                    setStaffOpen(false);
                                  }}
                                >
                                  {/* <Check
                                    className={
                                      value === staff.id.toString()
                                        ? "mr-2 h-4 w-4 opacity-100"
                                        : "mr-2 h-4 w-4 opacity-0"
                                    }
                                  /> */}
                                  {staff.first_name} {staff.last_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ) : (
                            <CommandEmpty>No staff found.</CommandEmpty>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patient_id"
            render={({ field }) => (
              <FormItem className="space-y-3 flex flex-col">
                <FormLabel>Patient</FormLabel>
                <FormControl>
                  <Popover open={patientOpen} onOpenChange={setPatientOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={patientOpen}
                        className="w-[200px] justify-between"
                      >
                        {patientDisplayName}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search patient..."
                          onValueChange={setPatientSearchTerm}
                        />
                        <CommandList>
                          {filteredPatients.length > 0 ? (
                            <CommandGroup>
                              {filteredPatients.map((patient) => (
                                <CommandItem
                                  key={patient.id}
                                  value={`${patient.first_name} ${patient.last_name}`}
                                  onSelect={() => {
                                    field.onChange(patient.id);
                                    setPatientDisplayName(
                                      `${patient.first_name} ${patient.last_name}`
                                    );
                                    setPatientOpen(false);
                                  }}
                                >
                                  {patient.first_name} {patient.last_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ) : (
                            <CommandEmpty>No patients found.</CommandEmpty>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value ? convertDateToInputValue(field.value) : ""
                    }
                    onChange={(e) => {
                      const newDateValue = e.target.value
                        ? new Date(`${e.target.value}T00:00:00.000Z`)
                        : null; // Use null to represent an empty date
                      field.onChange(newDateValue);
                    }}
                    className="w-[280px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    value={field.value ? field.value.slice(0, 5) : ""}
                    onChange={(e) => {
                      // Update the value to include seconds
                      const timeWithSeconds = formatTimeWithSeconds(
                        e.target.value
                      );
                      field.onChange(timeWithSeconds);
                    }}
                    className="w-[280px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    value={field.value ? field.value.slice(0, 5) : ""}
                    onChange={(e) => {
                      // Update the value to include seconds
                      const timeWithSeconds = formatTimeWithSeconds(
                        e.target.value
                      );
                      field.onChange(timeWithSeconds);
                    }}
                    className="w-[280px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your purpose" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-3">
            <Button
              type="button"
              disabled={isAvailable}
              onClick={checkAvailability}
            >
              Check
            </Button>
            {isAvailable && (
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BookingForm;
