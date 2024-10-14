"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner"; // To show toast notifications
import { useRouter } from "next/navigation"; // For refreshing or navigating after deletion
import { deleteStaffById } from "@/lib/staff";

type Props = {
  id: string;
  isListPage: boolean;
};

function DeleteStaff({ id, isListPage }: Props) {
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      const response = await deleteStaffById(+id); // Call the delete API
      if (response.status === 200) {
        toast("Staff deleted successfully", { duration: 2000 });
        setLoading(false); // Stop loading
        if (isListPage) {
          router.refresh();
        } else {
          router.push("/staffs");
        } // Redirect to the patients page
      } else {
        throw new Error("Failed to delete staff");
      }
    } catch (error) {
      toast.error("Error deleting staff");
      setLoading(false); // Stop loading in case of error
    }
  };
  return <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant={"destructive"} className="text-white">
      <Trash2 strokeWidth={2} className="cursor-pointer" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the
        staff data from the server.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </AlertDialogAction>{" "}
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
}

export default DeleteStaff;
