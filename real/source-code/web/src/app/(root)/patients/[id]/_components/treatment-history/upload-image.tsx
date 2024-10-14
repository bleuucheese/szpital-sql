"use client";
import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
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
import Image from "next/image";
import { uploadImage } from "@/lib/upload";
import { createDiagnostic } from "@/lib/diagnostic";
type Props = { procedure_id: number };
const formSchema = z.object({
  procedure_id: z.number(),
  image_type: z.string(),
  image_file: z.instanceof(File).optional(), // Accept file object
  date_taken: z.date(),
});

function UploadImage({ procedure_id }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procedure_id: procedure_id,
      image_type: "",
      image_file: undefined,
      date_taken: new Date(),
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
    setLoading(true); // Set loading state to true

    // Create FormData to handle file upload properly
    const formData = new FormData();
    if (!data.image_file) {
      toast("Please select an image file", { duration: 1000 });
      setLoading(false);
      return;
    }
    formData.append("file", data.image_file);

    const uploadRes = await uploadImage(formData);
    console.log(uploadRes);
    const imageUrl = uploadRes.image_url;
    const formattedData = {
      procedure_id: data.procedure_id,
      image_type: data.image_type,
      date_taken: new Date(data.date_taken), // Convert the string to a Date object
      image_url: imageUrl,
    };
    const res = await createDiagnostic(formattedData);
    if (res.status === 201) {
      toast("Image uploaded created", {
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
        <Button variant={"secondary"} className="">
          <ImageIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add diagnostic image</DialogTitle>
          <DialogDescription>
            Add diagnostic image into your system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image type" {...field} />
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
                        const file = e.target.files ? e.target.files[0] : null;
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
              name="date_taken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date taken</FormLabel>
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

export default UploadImage;
