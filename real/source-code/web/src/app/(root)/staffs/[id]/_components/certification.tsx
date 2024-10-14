"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createCerti } from "@/lib/certi";
import { uploadImage } from "@/lib/upload";
import { convertDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  staff_id: number;
  certificates: Certificate[];
};
const formSchema = z.object({
  staff_id: z.number(),
  certificate_type: z.string(),
  image_file: z.instanceof(File).optional(),
  issue_date: z.date(),
  expiry_date: z.date(),
});
function Certification({ staff_id, certificates }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staff_id: staff_id,
      certificate_type: "",
      image_file: undefined,
      issue_date: new Date(),
      expiry_date: new Date(),
    },
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const convertDateToInputValue = (date: Date | string) => {
    if (typeof date === "string") {
      date = new Date(date); // Convert string to Date object if necessary
    }
    return date.toISOString().split("T")[0];
  };
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    if (!data.image_file) {
      toast("Please select an image file", { duration: 1000 });
      setLoading(false);
      return;
    }
    formData.append("file", data.image_file);
    const uploadRes = await uploadImage(formData);
    const imageUrl = uploadRes.image_url;
    const formattedData = {
      staff_id: data.staff_id,
      certificate_type: data.certificate_type,
      issue_date: new Date(data.issue_date), // Convert the string to a Date object
      expiry_date: new Date(data.expiry_date),
      certificate_url: imageUrl,
    };
    const res = await createCerti(formattedData);
    console.log(res);
    if (res.status === 201) {
      toast("Certificate uploaded", {
        duration: 1000,
      });
      setIsDialogOpen(false);
      router.refresh();
    }
    setLoading(false);
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-3 bg-[#4C4372] p-3">
        <h2 className="text-xl font-semibold text-white ">Certification</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FilePlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add certification</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="certificate_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter certificate type"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_file" // Changed from image_url to image_file
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image File</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/*"
                          type="file"
                          // Ensure only images can be uploaded
                          onChange={(e) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : null;
                            if (file) {
                              setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the uploaded file
                            } else {
                              setImagePreviewUrl(null); // Clear preview if no file is selected
                            }
                            field.onChange(file); // Update the form state
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {imagePreviewUrl && (
                        <Image
                          width={100}
                          height={100}
                          src={imagePreviewUrl}
                          alt="Uploaded Preview"
                          className="mt-4"
                        />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="issue_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue date</FormLabel>
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
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry date</FormLabel>
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
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Certificate Type</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow key={certificate._id}>
                <TableCell className="font-medium">{certificate._id}</TableCell>
                <TableCell>{certificate.certificate_type}</TableCell>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={certificate.certificate_url}
                    alt={certificate.certificate_type}
                  />
                </TableCell>
                <TableCell>{convertDate(certificate.issue_date)}</TableCell>
                <TableCell>{convertDate(certificate.expiry_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Certification;
