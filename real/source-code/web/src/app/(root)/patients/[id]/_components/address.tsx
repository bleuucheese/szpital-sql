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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAddress, updateAddress } from "@/lib/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  patient: Patient;
};
const formSchema = z.object({
  address_line: z.string(),
  ward: z.string(),
  district: z.string(),
  city: z.string(),
});
function Address({ patient }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address_line: patient.address?.address_line,
      ward: patient.address?.ward,
      district: patient.address?.district,
      city: patient.address?.city,
    },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const formattedData = {
      ...data,
      patient_id: patient.id,
    };
    if (patient?.address?.id) {
      // Update the existing address
      const res = await updateAddress(patient.address.id, data);
      if (res.status === 200) {
        toast("Patient updated", { duration: 1000 });
      }
    } else {
      // Create a new address
      const res = await createAddress(formattedData); // Assuming you have a createAddress function
      if (res.status === 201) {
        toast("Address created and patient updated", { duration: 1000 });
      }
    }

    setIsDialogOpen(false); // Close the modal
    router.refresh(); // Refresh the page
  }
  return (
    <div className="bg-[#D4EAF6] flex flex-col space-y-3 rounded-md p-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Address</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              {" "}
              <Pencil />{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Edit Address</DialogTitle>
                  <DialogDescription>
                    Make change to patient address here. Click save when{" "}
                    {"you're "}done.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="address_line"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address line"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your ward" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your district" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button disabled={loading} type="submit" className="mt-3">
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <p>
        <span className="font-bold">+ Address line:</span>{" "}
        {patient.address?.address_line}
      </p>
      <p>
        <span className="font-bold">+ Ward:</span> {patient.address?.ward}
      </p>
      <p>
        <span className="font-bold">+ District:</span>{" "}
        {patient.address?.district}
      </p>
      <p>
        <span className="font-bold">+ City:</span> {patient.address?.city}
      </p>
    </div>
  );
}

export default Address;
