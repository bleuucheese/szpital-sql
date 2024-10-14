import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DoctorNoteDocument = HydratedDocument<DoctorNote>;

@Schema()
export class DoctorNote {
    @Prop({ required: true })
    procedure_id: number;

    @Prop()
    content: string;

    @Prop()
    date: Date;
}

export const DoctorNoteSchema = SchemaFactory.createForClass(DoctorNote);