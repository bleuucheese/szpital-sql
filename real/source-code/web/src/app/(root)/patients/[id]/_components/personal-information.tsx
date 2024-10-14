"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertDate } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePatientById } from "@/lib/patient";
import { useRouter } from "next/navigation";
type Props = {
  patient: Patient;
};
const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  cid: z.string(),
  dob: z.date(),
  gender: z.string(),
  blood_type: z.string(),
});
function PersonalInformation({ patient }: Props) {
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: patient.first_name,
      last_name: patient.last_name,
      cid: patient.cid,
      dob:
        typeof patient.dob === "string" ? new Date(patient.dob) : patient.dob, // Ensure dob is a Date
      gender: patient.gender,
      blood_type: patient.blood_type,
    },
  });
  const convertDateToInputValue = (date: Date | string) => {
    if (typeof date === "string") {
      date = new Date(date); // Convert string to Date object if necessary
    }
    return date.toISOString().split("T")[0];
  };
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true); // Set loading state to true
    const formattedData = {
      ...data,
      dob: new Date(data.dob), // Convert the string to a Date object
    };

    const res = await updatePatientById(patient.id, formattedData);
    if (res.status === 200) {
      toast("Patient updated", {
        duration: 1000,
      });
      setIsDialogOpen(false); // Close the modal
      router.refresh();
    }
    setLoading(false); // Set loading state to false
  }

  return (
    <div className="bg-[#D4EAF6] flex flex-col space-y-3 rounded-md p-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Personal Information</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Edit personal information</DialogTitle>
                  <DialogDescription>
                    Make changes to patient personal information here. Click
                    save when {"you're"} done.
                  </DialogDescription>
                </DialogHeader>

                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Civilization ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your civilization ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? convertDateToInputValue(field.value)
                              : ""
                          }
                          onChange={(e) => {
                            const newDateValue = e.target.value
                              ? new Date(`${e.target.value}T00:00:00.000Z`)
                              : null; // Use null to represent an empty date
                            field.onChange(newDateValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your gender" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="blood_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your blood type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="mt-3" disabled={loading}>
                    {loading ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <p>
        {" "}
        <span className="font-semibold">ID: </span> {patient.id}
      </p>
      <p>
        <span className="font-semibold">First name: </span>
        {patient.first_name}
      </p>
      <p>
        <span className="font-semibold">Last name: </span>
        {patient.last_name}
      </p>
      <p>
        <span className="font-semibold">Civilization ID: </span>
        {patient.cid}
      </p>
      <p>
        <span className="font-semibold">Date of birth: </span>
        {convertDate(patient.dob)}
      </p>
      <p>
        <span className="font-semibold">Gender:</span> {patient.gender}
      </p>
      <p>
        <span className="font-semibold">Blood Type: </span>
        {patient.blood_type}
      </p>
    </div>
  );
}

export default PersonalInformation;
