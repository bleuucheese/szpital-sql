import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LabResultDocument = HydratedDocument<LabResult>;

@Schema()
export class LabResult {
    @Prop({ required: true })
    procedure_id: number;

    @Prop()
    lab_type: string

    @Prop()
    description: string

    @Prop()
    date: Date
}

export const LabResultSchema = SchemaFactory.createForClass(LabResult)