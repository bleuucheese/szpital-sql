"use client";
import React from "react";
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
import { useRouter } from "next/navigation";
import { cancelAppointment } from "@/lib/appointment";
import { toast } from "sonner";
type Props = {
  appointmentId: number;
};

function CancelAppointment({ appointmentId }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);
    const res = await cancelAppointment(appointmentId);
    if (res.status === 200) {
      toast("Appointment cancelled successfully", { duration: 1000 });
      setIsOpen(false);
      router.refresh();
    } else {
      toast(res.statusText, { duration: 1000 });
    }
    setIsLoading(false);
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel your appointment data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel} disabled={isLoading}>
            {isLoading ? "Cancelling..." : "Yes, Cancel"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelAppointment;
