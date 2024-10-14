"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  history: TreatmentHistory;
};
const formSchema = z.object({
  type: z.string(),
  disease: z.string(),
  visited_date: z.date(),
});
function UpdateTreatmentHistory({ history }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: history.type,
      disease: history.disease,
      visited_date: history.visited_date,
    },
  });
  return <div>UpdateTreatmentHistory</div>;
}

export default UpdateTreatmentHistory;
