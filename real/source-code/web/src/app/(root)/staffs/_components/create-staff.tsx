"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "domain";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createStaff } from "@/lib/staff";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
type Props = {
  departments: Department[];
};
const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  dob: z.date(),
  job_type: z.string(),
  salary: z.number(),
  hired_date: z.date(),
  department_id: z.number(),
});
function CreateStaff({ departments }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dob: new Date(),
      job_type: "",
      salary: 0,
      hired_date: new Date(),
      department_id: 0,
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
      dob: new Date(data.dob),
      hired_date: new Date(data.hired_date),
    };
    const res = await createStaff(formattedData);
    if (res.status === 201) {
      toast("Staff created", {
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
          <DialogTitle>Add new staff</DialogTitle>
          <DialogDescription>
            Add new staff into your system. You can update their data anytime.
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
              name="job_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your job type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your salary"
                      {...field}
                      value={field.value || ""} // Ensures the value is controlled, avoids undefined
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ""
                        )
                      } // Convert the input string to a number
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hired_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hired date</FormLabel>
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
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger aria-label="Department">
                        <SelectValue placeholder="Select department" />
                        {/* Assuming you have an icon component */}
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            key={department.id}
                            value={department.id.toString()}
                          >
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default CreateStaff;
