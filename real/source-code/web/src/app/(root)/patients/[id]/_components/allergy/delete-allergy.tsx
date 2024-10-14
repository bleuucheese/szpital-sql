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
import { deleteAllergyFromPatient } from "@/lib/allergy";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type Props = {
  allergyId: number;
  patientId: number;
};

function DeleteAllergy({ allergyId, patientId }: Props) {
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const router = useRouter();
  const handleClick = async () => {
    setLoading(true); // Start loading
    const res = await deleteAllergyFromPatient(patientId, allergyId);
    if (res.status === 200) {
      toast("Allergy deleted successfully", { duration: 1000 });
      setIsDialogOpen(false);
      router.refresh();
    }
    setLoading(false);
  };
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="text-white">
          <Trash2 strokeWidth={2} className="cursor-pointer" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleClick}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAllergy;
