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
import { deletePatientById } from "@/lib/patient";
type Props = {
  id: string;
  isListPage: boolean;
};

function DeletePatient({ id, isListPage }: Props) {
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      const response = await deletePatientById(+id); // Call the delete API
      if (response.status === 200) {
        toast("Patient deleted successfully", { duration: 2000 });
        setLoading(false); // Stop loading
        if (isListPage) {
          router.refresh();
        } else {
          router.push("/patients");
        } // Redirect to the patients page
      } else {
        throw new Error("Failed to delete patient");
      }
    } catch (error) {
      toast.error("Error deleting patient");
      setLoading(false); // Stop loading in case of error
    }
  };
  return (
    <div className="flex space-x-3">
      <AlertDialog>
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
              patient data from the server.
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
    </div>
  );
}

export default DeletePatient;
