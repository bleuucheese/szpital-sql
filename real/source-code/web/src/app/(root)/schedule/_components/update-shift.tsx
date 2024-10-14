"use client";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
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
type Props = {
  shift: Shift;
};
const formSchema = z.object({
  day_of_week: z.string(),
  start_hour: z.string(),
  end_hour: z.string(),
});
function UpdateShift({ shift }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day_of_week: shift.day_of_week,
      start_hour: shift.start_hour,
      end_hour: shift.end_hour,
    },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formatTimeWithSeconds = (time: any) => {
    return `${time}:00`;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit staff shift</DialogTitle>
              <DialogDescription>
                Make changes to staff shift information here. Click save when{" "}
                {"you're"} done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="day_of_week"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day of week</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter day of week" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Hour</FormLabel>
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
              name="end_hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Hour</FormLabel>
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

export default UpdateShift;
