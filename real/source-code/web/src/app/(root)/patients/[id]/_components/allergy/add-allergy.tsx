"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, severities } from "@/constants/allergy";
import { addAllergyToPatient } from "@/lib/allergy";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type Props = {
  patient: Patient;
  allergies: Allergy[];
};

function AddAllergy({ patient, allergies }: Props) {
  const [loading, setLoading] = useState(false); // Loading state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAllergy, setSelectedAllergy] = useState<Allergy | null>(null);
  const [severity, setSeverity] = useState<string | null>(null);
  const router = useRouter();
  // Filter out allergies that the patient already has
  const availableAllergies = allergies.filter(
    (allergy) =>
      !patient.allergies.some(
        (patientAllergy) => patientAllergy.allergen === allergy.allergen
      )
  );

  // Get all allergies in the selected category
  const getAllergiesByCategory = (category: string): Allergy[] | [] => {
    return availableAllergies.filter(
      (allergy) => allergy.category === category
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (selectedAllergy && severity) {
      const data = {
        patient_id: patient.id,
        allergy_id: selectedAllergy.id,
        severity,
      };
      const res = await addAllergyToPatient(data);
      if (res.status === 201) {
        toast("Allergy added successfully", { duration: 1000 });
        setIsDialogOpen(false);
        router.refresh();
      }
      setLoading(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full text-white border-white font-semibold bg-transparent hover:bg-transparent p-0 text-2xl border-[2px] size-9 flex items-center justify-center"
          variant={"outline"}
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new allergy</DialogTitle>
          <DialogDescription>
            Add new allergy for a patient. You can delete it anytime.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Select Category */}
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value); // Set the selected category
              setSelectedAllergy(null); // Reset selected allergy to null
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Select Allergy (Filtered by Category) */}
          {selectedCategory && (
            <Select
              onValueChange={(value) => {
                const selected = availableAllergies.find(
                  (allergy) => allergy.allergen === value
                );
                setSelectedAllergy(selected || null); // Set the selected allergy object
              }}
            >
              <SelectTrigger className="w-[180px] mt-4">
                <SelectValue placeholder="Select Allergy" />
              </SelectTrigger>
              <SelectContent>
                {getAllergiesByCategory(selectedCategory).map((allergy) => (
                  <SelectItem key={allergy.id} value={allergy.allergen}>
                    {allergy.allergen}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Display selected allergy symptom and severity */}
          {selectedAllergy && (
            <div className="mt-4">
              <p>
                <strong>Symptom:</strong> {selectedAllergy.symptoms}
              </p>
              <Select onValueChange={(value) => setSeverity(value)}>
                <SelectTrigger className="w-[180px] mt-4">
                  <SelectValue placeholder="Select Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severities.map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      {severity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading || !selectedAllergy || !severity}
            >
              {loading ? "Adding..." : "Add Allergy"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAllergy;
