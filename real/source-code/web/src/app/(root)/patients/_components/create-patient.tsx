"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createPatient } from "@/lib/patient";
const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  cid: z.string(),
  dob: z.date(),
  gender: z.string(),
  blood_type: z.string(),
});
type Props = {};

function CreatePatient({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      cid: "",
      dob: new Date(),
      gender: "",
      blood_type: "",
    },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
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
    const res = await createPatient(formattedData);
    if (res.status === 201) {
      toast("Patient created", {
        duration: 1000,
      });
      setIsDialogOpen(false); // Close the modal
      router.refresh();
    }
    setLoading(false); // Set loading state to false
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full font-semibold bg-transparent hover:bg-transparent p-0 text-2xl border-black border-[2px] size-9 flex items-center justify-center"
          variant={"secondary"}
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new patient</DialogTitle>
          <DialogDescription>
            Add new patient into your system. You can update their data anytime.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
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
                        field.value ? convertDateToInputValue(field.value) : ""
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
  );
}

export default CreatePatient;
