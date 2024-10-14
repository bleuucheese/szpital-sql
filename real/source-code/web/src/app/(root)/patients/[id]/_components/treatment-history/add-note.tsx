"use client";
import React, { useState } from "react";
import { FilePlus2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createDoctorNote } from "@/lib/doctor-note";

type Props = {
  procedure_id: number;
};
const formSchema = z.object({
  procedure_id: z.number(),
  content: z.string(),
  date: z.date(),
});
function AddNote({ procedure_id }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedure_id: procedure_id,
      content: "",
      date: new Date(),
    },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      date: new Date(data.date), // Convert the string to a Date object
    };
    console.log(formattedData);
    const res = await createDoctorNote(formattedData);
    console.log(res);
    if (res.status === 201) {
      toast("Note created", {
        duration: 1000,
      });
      setIsDialogOpen(false);
      router.refresh();
    }
    setLoading(false);
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-300">
          <FilePlus2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add procedure note</DialogTitle>
          <DialogDescription>
            Add procedure note into your system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter note content" {...field} />
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
                    />
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

export default AddNote;
